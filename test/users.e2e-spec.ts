import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User (e2e)', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@mail.ru',
        password: 'Uzbek1$t0n',
      });
    token = response.body.token;
    console.log(token);
  });
  it('/users(GET) --> 200 OK', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/users(GET) --> 401 "Unauthorized" error', () => {
    return (
      request(app.getHttpServer())
        .get('/users')
        // .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(401)
    );
  });

  //   it('/auth/registration (POST) -->201', async () => {
  //     return request(app.getHttpServer())
  //       .post('/auth/registration')
  //       .send({
  //         name: 'admin444',
  //         email: 'admin559@mail.ru',
  //         password: 'Uzbek1$t0n',
  //       })
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toMatchObject({
  //           token: expect.any(String),
  //         });
  //       });
  //   });

  it('/auth/registration (POST) -->500', async () => {
    return request(app.getHttpServer())
      .post('/auth/registration')
      .send({
        name: 'admin444',
        email: 'admin559@mail.ru',
        password: 'Uzbek1$t0n',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Bunday foydalanuvchi mavjud',
      });
  });

  it('/auth/registration (POST) --> 400 on Validation error', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'admin444',
        email: 'admin559@mail.ru',
        password: 'Uzbe',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['password is not strong enough'],
        error: 'Bad Request',
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
