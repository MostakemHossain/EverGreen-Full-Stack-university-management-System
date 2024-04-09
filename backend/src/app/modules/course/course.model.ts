import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';
const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    default: false,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    prefix: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    preRequisiteCourses: {
      type: [preRequisiteCourseSchema],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Course= model('Course',courseSchema)
