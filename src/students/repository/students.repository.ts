import { Injectable } from '@nestjs/common';
import { db } from './db';

@Injectable()
export class StudentsRepository {
  db: any[] = db;

  getStudent = (id: string) =>
    this.db[0].data.find((student) => student.id === id);

  getCourse = (id: string) =>
    this.db[1].data.find((course) => course.id === id);

  enrollStudent = (studentId: string, courseId: string) => {
    const updateDb = [...this.db];
    const student = updateDb[0].data.findIndex(
      (student) => student.id === studentId,
    );
    const course = updateDb[1].data.findIndex(
      (course) => course.id === courseId,
    );
    updateDb[0].data[student].courses = [
      ...updateDb[0].data[student].courses,
      courseId,
    ];
    updateDb[1].data[course].students = [
      ...updateDb[1].data[course].students,
      studentId,
    ];
  };
}
