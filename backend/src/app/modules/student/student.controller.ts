/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'Students retrieved Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleStudenFromDb(
      req.params.studentId,
    );
    res.status(200).json({
      success: true,
      message: 'Student is retrieved Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.deleteStudentFromDb(
      req.params.studentId,
    );
    res.status(200).json({
      success: true,
      message: 'Student is deleted Succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
