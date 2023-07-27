import { JwtService } from '@nestjs/jwt';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');
describe('Users controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it('should be defined usersController', () => {
    expect(usersController).toBeDefined();
  });
  it('should be defined usersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUsersDto: CreateUserDto;
      beforeAll(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.createUser(createUsersDto);
        console.log(user);
      });
      it('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUsersDto);
      });
      it('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
