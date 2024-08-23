import { Module } from '@nestjs/common';
import { StudentsService } from './service/students.service';
import { StudentsController } from './students.controller';
import { StudentsRepository } from './repository/students.repository';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, StudentsRepository],
})
export class StudentsModule {}
