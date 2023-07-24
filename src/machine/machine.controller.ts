import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Avtomashinalar')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @ApiOperation({ summary: "Avtomashina yaratish" })
  @Post('create')
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    return this.machineService.createMachine(createMachineDto);
  }

  @ApiOperation({ summary: "Avtomashinalarni ko'rish" })
  @Get('all')
  async getAllMachine(): Promise<Machine[]> {
    return this.machineService.getAllMachine();
  }

  @ApiOperation({ summary: "Avtomashinani id bo'yicha ko'rish" })
  @Get(':id')
  async getMachineBYId(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }

  @ApiOperation({ summary: "Avtomashinani nom bo'yicha ko'rish" })
  @Get(':name')
  async getMachineByName(@Param('name') name: string): Promise<Machine> {
    return this.machineService.getMachineByName(name);
  }

  @ApiOperation({ summary: "Avtomashinani o'chirish" })
  @Delete(':id')
  async deleteMachineById(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachineById(+id);
  }

  @ApiOperation({ summary: "Avtomashinani o'zgartirish" })
  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}
