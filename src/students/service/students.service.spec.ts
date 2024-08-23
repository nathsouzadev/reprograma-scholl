import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentsRepository } from '../repository/students.repository';
import { randomUUID } from 'crypto';

describe('StudentsService', () => {
  let service: StudentsService;
  let mockStudentsRepository: StudentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: StudentsRepository,
          useValue: {
            getStudent: jest.fn(),
            getCourse: jest.fn(),
            enrollStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    mockStudentsRepository = module.get<StudentsRepository>(StudentsRepository);
  });

  it('should be enroll student', () => {
    jest
      .spyOn(mockStudentsRepository, 'getStudent')
      .mockReturnValue({ id: randomUUID() });
    jest
      .spyOn(mockStudentsRepository, 'getCourse')
      .mockReturnValue({ id: randomUUID() });

    const response = service.enroll({
      studentId: randomUUID(),
      courseId: randomUUID(),
    });
    expect(mockStudentsRepository.getStudent).toHaveBeenCalled();
    expect(mockStudentsRepository.getCourse).toHaveBeenCalled();
    expect(mockStudentsRepository.enrollStudent).toHaveBeenCalled();
    expect(response).toMatchObject({ message: 'Student enrolled' });
  });
});
