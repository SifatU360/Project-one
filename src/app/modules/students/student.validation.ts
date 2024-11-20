import Joi from 'joi';


// User Name Validation Schema
const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .required()
      .pattern(/^[A-Z][a-z]+$/, 'capitalize format') // Matches the first letter capitalized
      .messages({
        'string.empty': 'First name is required and cannot be empty',
        'string.max': 'First name cannot be longer than 20 characters',
        'string.pattern.name': '{#value} is not in capitalize format',
      }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]+$/, 'alpha characters only') // Alphabetic only
      .messages({
        'string.empty': 'Last name is required and cannot be empty',
        'string.pattern.name': '{#value} is not a valid name',
      }),
  });

  // Guardian Validation Schema
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      'string.empty': "Father's name is required and cannot be empty",
    }),
    fatherOccupation: Joi.string().required().messages({
      'string.empty': "Father's occupation is required and cannot be empty",
    }),
    fatherContactNo: Joi.string().required().messages({
      'string.empty':
        "Father's contact number is required and cannot be empty",
    }),
    motherName: Joi.string().required().messages({
      'string.empty': "Mother's name is required and cannot be empty",
    }),
    motherOccupation: Joi.string().required().messages({
      'string.empty': "Mother's occupation is required and cannot be empty",
    }),
    motherContactNo: Joi.string().required().messages({
      'string.empty':
        "Mother's contact number is required and cannot be empty",
    }),
  });

  // Local Guardian Validation Schema
  const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.empty': "Local guardian's name is required and cannot be empty",
    }),
    occupation: Joi.string().required().messages({
      'string.empty':
        "Local guardian's occupation is required and cannot be empty",
    }),
    contactNo: Joi.string().required().messages({
      'string.empty':
        "Local guardian's contact number is required and cannot be empty",
    }),
    address: Joi.string().required().messages({
      'string.empty':
        "Local guardian's address is required and cannot be empty",
    }),
  });

  // Main Student Validation Schema
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      'string.empty': 'Student ID is required and cannot be empty',
    }),
    name: userNameSchema.required().messages({
      'object.base': 'Name details are required',
    }),
    gender: Joi.string().valid('male', 'female').required().messages({
      'string.empty': 'Gender is required and cannot be empty',
      'any.only': 'Gender must be either "male" or "female"',
    }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email address is required and cannot be empty',
      'string.email': '{#value} is not a valid email address',
    }),
    contactNo: Joi.string().required().messages({
      'string.empty': 'Contact number is required and cannot be empty',
    }),
    emergencyContactNo: Joi.string().required().messages({
      'string.empty':
        'Emergency contact number is required and cannot be empty',
    }),
    bloodgroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
      .optional()
      .messages({
        'any.only':
          'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
      }),
    presentAddress: Joi.string().required().messages({
      'string.empty': 'Present address is required and cannot be empty',
    }),
    permanentAddress: Joi.string().required().messages({
      'string.empty': 'Permanent address is required and cannot be empty',
    }),
    guardian: guardianSchema.required().messages({
      'object.base': 'Guardian details are required',
    }),
    localGuardian: localGuardianSchema.required().messages({
      'object.base': 'Local guardian details are required',
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
      .valid('Active', 'Blocked')
      .default('Active')
      .messages({
        'any.only': 'Status must be either "Active" or "Blocked"',
      }),
  });








export default studentValidationSchema;


