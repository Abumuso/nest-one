import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rollar')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Rol yaratish' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "Rollarni ko'rish" })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: "Rollarni nom bo'yicha ko'rish" })
  @Get(':value')
  getByRoleValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
