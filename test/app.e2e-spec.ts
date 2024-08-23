import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should enroll student on course', () => {
    const studentId = 'db2d6c1d-6f6f-485e-987e-abc890919188';
    const courseId = '340d5695-ec32-442b-bb87-d395ab1a04b2';

    return request(app.getHttpServer())
      .post(`/students/${studentId}/course/${courseId}`)
      .expect(201)
      .then((response) =>
        expect(response.body).toMatchObject({ message: 'Student enrolled' }),
      );
  });

  it('should throw error if enroll student not exists on course', () => {
    const studentId = randomUUID();
    const courseId = '340d5695-ec32-442b-bb87-d395ab1a04b2';

    return request(app.getHttpServer())
      .post(`/students/${studentId}/course/${courseId}`)
      .expect(404)
      .then((response) =>
        expect(response.body).toMatchObject({ message: 'Student not found' }),
      );
  });

  it('should throw error if enroll student on coursenot exists', () => {
    const studentId = 'db2d6c1d-6f6f-485e-987e-abc890919188';
    const courseId = randomUUID();

    return request(app.getHttpServer())
      .post(`/students/${studentId}/course/${courseId}`)
      .expect(404)
      .then((response) =>
        expect(response.body).toMatchObject({ message: 'Course not found' }),
      );
  });
});
