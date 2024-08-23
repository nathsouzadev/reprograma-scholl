import { Controller, Param, Post } from '@nestjs/common';
import { StudentsService } from './service/students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post(':id/course/:courseId')
  enroll(
    @Param('id') studentId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.studentsService.enroll({
      studentId,
      courseId,
    });
  }
}
