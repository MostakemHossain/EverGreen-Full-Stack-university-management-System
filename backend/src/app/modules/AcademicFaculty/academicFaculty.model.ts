import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({ name: this.name });
  if (isFacultyExists) {
    throw new Error('This Faculty is Already Exists');
  }
  next();
});
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExists = await AcademicFaculty.find(query);
  if (!isFacultyExists) {
    throw new Error('This Faculty is Not found');
  }
  next();
});

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
