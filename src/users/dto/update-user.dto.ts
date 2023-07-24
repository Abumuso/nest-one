import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user1@mail.ru',
    description: 'Foydalanuvchi e-pochtasi',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi paroli' })
  @IsOptional()
  @IsStrongPassword()
  password: string;
}
