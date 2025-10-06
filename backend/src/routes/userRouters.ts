import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();

// CREATE - Register new user
router.post('/register', UserController.registerUser);

// READ - Get all users
router.get('/users', UserController.getAllUsers);

// READ - Get user by ID
router.get('/users/:id', UserController.getUserById);

// UPDATE - Update user by ID
router.put('/users/:id', UserController.updateUser);

// DELETE - Delete user by ID
router.delete('/users/:id', UserController.deleteUser);

export default router;