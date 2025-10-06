import Joi from 'joi';

const personalInfoSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters long',
    'string.max': 'First name cannot exceed 50 characters',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters long',
    'string.max': 'Last name cannot exceed 50 characters',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  phone: Joi.string().min(10).max(15).required().messages({
    'string.min': 'Phone number must be at least 10 digits',
    'string.max': 'Phone number cannot exceed 15 digits',
    'any.required': 'Phone number is required'
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of birth must be in ISO format (YYYY-MM-DD)',
    'any.required': 'Date of birth is required'
  }),
  nationality: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Nationality must be at least 2 characters long',
    'string.max': 'Nationality cannot exceed 50 characters',
    'any.required': 'Nationality is required'
  })
});

const addressSchema = Joi.object({
  street: Joi.string().min(5).max(100).required().messages({
    'string.min': 'Street address must be at least 5 characters long',
    'string.max': 'Street address cannot exceed 100 characters',
    'any.required': 'Street address is required'
  }),
  city: Joi.string().min(2).max(50).required().messages({
    'string.min': 'City must be at least 2 characters long',
    'string.max': 'City cannot exceed 50 characters',
    'any.required': 'City is required'
  }),
  state: Joi.string().min(2).max(50).required().messages({
    'string.min': 'State must be at least 2 characters long',
    'string.max': 'State cannot exceed 50 characters',
    'any.required': 'State is required'
  }),
  postalCode: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Postal code must be at least 3 characters long',
    'string.max': 'Postal code cannot exceed 20 characters',
    'any.required': 'Postal code is required'
  }),
  country: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Country must be at least 2 characters long',
    'string.max': 'Country cannot exceed 50 characters',
    'any.required': 'Country is required'
  })
});

export const userRegistrationSchema = Joi.object({
  personalInfo: personalInfoSchema.required(),
  residentialAddress: addressSchema.required(),
  postalAddress: addressSchema.required()
});

export const userUpdateSchema = Joi.object({
  personalInfo: personalInfoSchema.optional(),
  residentialAddress: addressSchema.optional(),
  postalAddress: addressSchema.optional()
}).min(1); // At least one field must be provided for update