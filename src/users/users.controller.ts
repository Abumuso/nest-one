import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UserSelfGuard } from '../guard/user-self.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorators/roles-auth.decorators';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni ko'rish" })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Foydalanuvchi ID bo'yicha ko'rish" })
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneUser(@Param('id') id: number): Promise<User> {
    return this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: "Foydalanuvchilarni o'chirish" })
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.usersService.deleteUserById(+id);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }

  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
}
