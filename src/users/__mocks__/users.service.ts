import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  getOneUser: jest.fn().mockResolvedValue(userStub()),
  getAllUsers: jest.fn().mockResolvedValue([userStub()]),
  createUser: jest.fn().mockResolvedValue(userStub()),
  deleteUserById: jest
    .fn()
    .mockResolvedValue({ message: "Foydalanuvchi o'chirildi" }),
});
