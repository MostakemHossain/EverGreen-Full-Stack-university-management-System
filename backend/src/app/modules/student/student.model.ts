import { Schema, model } from 'mongoose';
import { TStudent, TStudentModel } from './student.interface';

const nameSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name cannot be more than 20 characters'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
});

const guardianSchema = new Schema({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
    trim: true,
  },
  fatherContactNumber: {
    type: String,
    required: [true, 'Father contact number is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
    trim: true,
  },
  motherContactNumber: {
    type: String,
    required: [true, 'Mother contact number is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Local guardian contact number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
    trim: true,
  },
  relation: {
    type: String,
    required: [true, 'Local guardian relation is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: { type: String, unique: true, required: true, trim: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user Id is required'],
      unique: true,
      ref: 'User ',
    },
    name: {
      type: nameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      message: '{VALUES} is not Valid',
      required: [true, 'Gender is required'],
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Emergency contact number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUES} is not Valid',
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },

    profileImage: {
      type: String,
      default: '',
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

studentSchema.virtual('FullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
