import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsRepository } from '../repository/students.repository';

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentsRepository) {}

  enroll({ studentId, courseId }: { studentId: string; courseId: string }) {
    const student = this.studentRepository.getStudent(studentId);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const course = this.studentRepository.getCourse(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    this.studentRepository.enrollStudent(studentId, courseId);

    return {
      message: 'Student enrolled',
    };
  }
}
