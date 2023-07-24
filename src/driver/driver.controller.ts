import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Haydovchilar')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: "Haydovchi yaratish" })
  @Post('create')
  async createDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.createDriver(createDriverDto);
  }

  @ApiOperation({ summary: "Haydovchilarni ko'rish" })
  @Get('all')
  async getAllDriver(): Promise<Driver[]> {
    return this.driverService.getAllDriver();
  }

  @ApiOperation({ summary: "Haydovchini id bo'yicha ko'rish" })
  @Get(':id')
  async getDriverBYId(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriverById(+id);
  }

  @ApiOperation({ summary: "Haydovchini nom bo'yicha ko'rish" })
  @Get(':name')
  async getDriverByName(@Param('name') name: string): Promise<Driver> {
    return this.driverService.getDriverByName(name);
  }

  @ApiOperation({ summary: "Haydovchini o'chirish" })
  @Delete(':id')
  async deleteDriverById(@Param('id') id: string): Promise<number> {
    return this.driverService.deleteDriverById(+id);
  }

  @ApiOperation({ summary: "Haydovchini o'zgartirish" })
  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}
