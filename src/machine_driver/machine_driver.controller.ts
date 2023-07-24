import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Machine_driver } from './models/machine_driver.model';
import { Machine_driverService } from './machine_driver.service';
import { CreateMachine_driverDto } from './dto/create-machine_driver.dto';
import { UpdateMachine_driverDto } from './dto/update-machine_driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AvtoHaydovchi')
@Controller('machine_driver')
export class MachineDriverController {
  constructor(private readonly machine_driverService: Machine_driverService) {}

  @ApiOperation({ summary: 'AvtoHaydovchi yaratish' })
  @Post('create')
  async createMachine_driver(
    @Body() createMachine_driverDto: CreateMachine_driverDto,
  ) {
    return this.machine_driverService.createMachine_driver(
      createMachine_driverDto,
    );
  }

  @ApiOperation({ summary: "AvtoHaydovchilarni ko'rish" })
  @Get('all')
  async getAllMachine_driver(): Promise<Machine_driver[]> {
    return this.machine_driverService.getAllMachine_driver();
  }

  @ApiOperation({ summary: "AvtoHaydovchini id bo'yicha ko'rish" })
  @Get(':id')
  async getMachine_driverBYId(
    @Param('id') id: string,
  ): Promise<Machine_driver> {
    return this.machine_driverService.getMachine_driverById(+id);
  }

  //   @Get(':name')
  //   async getMachine_driverByName(
  //     @Param('name') name: string,
  //   ): Promise<Machine_driver> {
  //     return this.machine_driverService.getMachine_driverByName(name);
  //   }

  @ApiOperation({ summary: "AvtoHaydovchini o'chirish" })
  @Delete(':id')
  async deleteMachine_driverById(@Param('id') id: string): Promise<number> {
    return this.machine_driverService.deleteMachine_driverById(+id);
  }

  @ApiOperation({ summary: "AvtoHaydovchini o'zgartirish" })
  @Put(':id')
  async updateMachine_driver(
    @Param('id') id: string,
    @Body() updateMachine_driverDto: UpdateMachine_driverDto,
  ): Promise<Machine_driver> {
    return this.machine_driverService.updateMachine_driver(
      +id,
      updateMachine_driverDto,
    );
  }
}
