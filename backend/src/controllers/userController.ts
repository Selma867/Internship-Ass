import { Request, Response } from 'express';
import { getDB } from '../config/database.js';
import { User, UserResponse, UsersResponse } from '../models/types.js';
import { userRegistrationSchema, userUpdateSchema } from '../middleware/validation.js';

export class UserController {
  // CREATE - Register new user
  static async registerUser(req: Request, res: Response): Promise<void> {
    const client = await getDB().connect();
    
    try {
      console.log('📝 Registration request received');
      
      const { error } = userRegistrationSchema.validate(req.body);
      if (error) {
        console.log('❌ Validation error:', error.details[0].message);
        res.status(400).json({
          success: false,
          error: error.details[0].message
        });
        return;
      }

      const { personalInfo, residentialAddress, postalAddress }: User = req.body;

      // Check if email already exists - PostgreSQL JSON query
      const emailCheck = await client.query(
        `SELECT id FROM users WHERE personal_info->>'email' = $1`,
        [personalInfo.email]
      );

      if (emailCheck.rows.length > 0) {
        res.status(409).json({
          success: false,
          error: 'Email already exists'
        });
        return;
      }

      const query = `
        INSERT INTO users (personal_info, residential_address, postal_address)
        VALUES ($1, $2, $3)
        RETURNING *
      `;

      const values = [
        personalInfo,
        residentialAddress,
        postalAddress
      ];

      const result = await client.query(query, values);
      const newUser = result.rows[0];

      const response: UserResponse = {
        success: true,
        data: {
          id: newUser.id,
          personalInfo: newUser.personal_info,
          residentialAddress: newUser.residential_address,
          postalAddress: newUser.postal_address,
          createdAt: newUser.created_at,
          updatedAt: newUser.updated_at
        },
        message: 'User registered successfully'
      };

      console.log('✅ Registration completed successfully. User ID:', newUser.id);
      res.status(201).json(response);
    } catch (error) {
      console.error('💥 Registration error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    } finally {
      client.release();
    }
  }

  // READ - Get all users
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    const client = await getDB().connect();
    
    try {
      console.log('📋 Getting all users');
      const result = await client.query(
        'SELECT * FROM users ORDER BY created_at DESC'
      );

      const response: UsersResponse = {
        success: true,
        data: result.rows.map(user => ({
          id: user.id,
          personalInfo: user.personal_info,
          residentialAddress: user.residential_address,
          postalAddress: user.postal_address,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }))
      };

      console.log(`✅ Retrieved ${result.rows.length} users`);
      res.json(response);
    } catch (error) {
      console.error('💥 Get all users error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    } finally {
      client.release();
    }
  }

  // READ - Get user by ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    const client = await getDB().connect();
    
    try {
      const { id } = req.params;
      console.log(`👤 Getting user with ID: ${id}`);

      const result = await client.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        console.log('❌ User not found');
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      const user = result.rows[0];
      const response: UserResponse = {
        success: true,
        data: {
          id: user.id,
          personalInfo: user.personal_info,
          residentialAddress: user.residential_address,
          postalAddress: user.postal_address,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };

      console.log('✅ User retrieved successfully');
      res.json(response);
    } catch (error) {
      console.error('💥 Get user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    } finally {
      client.release();
    }
  }

  // UPDATE - Update user by ID
  static async updateUser(req: Request, res: Response): Promise<void> {
    const client = await getDB().connect();
    
    try {
      const { id } = req.params;
      console.log(`✏️ Updating user with ID: ${id}`);

      const { error } = userUpdateSchema.validate(req.body);
      if (error) {
        console.log('❌ Validation error:', error.details[0].message);
        res.status(400).json({
          success: false,
          error: error.details[0].message
        });
        return;
      }

      // Check if user exists
      const userCheck = await client.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );

      if (userCheck.rows.length === 0) {
        console.log('❌ User not found for update');
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      // Check email uniqueness if email is being updated
      if (req.body.personalInfo?.email) {
        const emailCheck = await client.query(
          `SELECT id FROM users WHERE personal_info->>'email' = $1 AND id != $2`,
          [req.body.personalInfo.email, id]
        );

        if (emailCheck.rows.length > 0) {
          res.status(409).json({
            success: false,
            error: 'Email already exists'
          });
          return;
        }
      }

      // Build update query dynamically based on provided fields
      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (req.body.personalInfo) {
        updateFields.push(`personal_info = $${paramCount}`);
        values.push(req.body.personalInfo);
        paramCount++;
      }

      if (req.body.residentialAddress) {
        updateFields.push(`residential_address = $${paramCount}`);
        values.push(req.body.residentialAddress);
        paramCount++;
      }

      if (req.body.postalAddress) {
        updateFields.push(`postal_address = $${paramCount}`);
        values.push(req.body.postalAddress);
        paramCount++;
      }

      // Always update the updated_at timestamp
      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      
      values.push(id); // For WHERE clause

      const query = `
        UPDATE users 
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;

      const result = await client.query(query, values);
      const updatedUser = result.rows[0];

      const response: UserResponse = {
        success: true,
        data: {
          id: updatedUser.id,
          personalInfo: updatedUser.personal_info,
          residentialAddress: updatedUser.residential_address,
          postalAddress: updatedUser.postal_address,
          createdAt: updatedUser.created_at,
          updatedAt: updatedUser.updated_at
        },
        message: 'User updated successfully'
      };

      console.log('✅ User updated successfully');
      res.json(response);
    } catch (error) {
      console.error('💥 Update user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    } finally {
      client.release();
    }
  }

  // DELETE - Delete user by ID
  static async deleteUser(req: Request, res: Response): Promise<void> {
    const client = await getDB().connect();
    
    try {
      const { id } = req.params;
      console.log(`🗑️ Deleting user with ID: ${id}`);

      // Check if user exists and get user data for response
      const userCheck = await client.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );

      if (userCheck.rows.length === 0) {
        console.log('❌ User not found for deletion');
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      const userToDelete = userCheck.rows[0];

      // Delete the user
      await client.query(
        'DELETE FROM users WHERE id = $1',
        [id]
      );

      const response = {
        success: true,
        message: 'User deleted successfully',
        deletedUser: {
          id: userToDelete.id,
          personalInfo: userToDelete.personal_info,
          residentialAddress: userToDelete.residential_address,
          postalAddress: userToDelete.postal_address
        }
      };

      console.log('✅ User deleted successfully');
      res.json(response);
    } catch (error) {
      console.error('💥 Delete user error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    } finally {
      client.release();
    }
  }
}