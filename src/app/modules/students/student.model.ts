import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  localGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required and cannot be empty'],
    trim:true,
    maxlength: [20, 'First name cannot be  longer than 20 characters'], // builtin validation
    validate: { // custom validation
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase () + value.slice(1);
        return firstNameStr === value ;
      },
      message: '{VALUE} is  not in capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required and cannot be empty'],
    // validator library
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value), // is alpha check the name can't include numbers
    //   message: '{VALUE} is not a valid name',
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required and cannot be empty'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father\'s occupation is required and cannot be empty'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father\'s contact number is required and cannot be empty'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother\'s name is required and cannot be empty'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother\'s occupation is required and cannot be empty'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother\'s contact number is required and cannot be empty'],
  },
});

const localGuardianSchema = new Schema<localGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian\'s name is required and cannot be empty'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian\'s occupation is required and cannot be empty'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian\'s contact number is required and cannot be empty'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian\'s address is required and cannot be empty'],
  },
});

const studentSchema = new Schema<Student>({
  id: { 
    type: String, 
    required: [true, 'Student ID is required and cannot be empty'], 
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name details are required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either "male" or "female"',
    },
    required: [true, 'Gender is required and cannot be empty'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email address is required and cannot be empty'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required and cannot be empty'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required and cannot be empty'],
  },
  bloodgroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required and cannot be empty'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required and cannot be empty'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian details are required'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['Active', 'Blocked'],
      message: 'Status must be either "Active" or "Blocked"',
    },
    default: 'Active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
