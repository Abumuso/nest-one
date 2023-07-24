import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from 'src/builder/dto/update-builder.dto';
import { Builder } from './models/builder.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Quruvchilar')
@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @ApiOperation({ summary: 'Quruvchi yaratish' })
  @Post('create')
  async createBuilder(@Body() createBuilderDto: CreateBuilderDto) {
    return this.builderService.createBuilder(createBuilderDto);
  }

  @ApiOperation({ summary: "Quruvchilarni ko'rish" })
  @Get('all')
  async getAllBuilder(): Promise<Builder[]> {
    return this.builderService.getAllBuilder();
  }

  @ApiOperation({ summary: "Quruvchini id bo'yicha ko'rish" })
  @Get(':id')
  async getBuilderBYId(@Param('id') id: string): Promise<Builder> {
    return this.builderService.getBuilderById(+id);
  }

  @ApiOperation({ summary: "Quruvchini nom bo'yicha ko'rish" })
  @Get(':name')
  async getBuilderByName(@Param('name') name: string): Promise<Builder> {
    return this.builderService.getBuilderByName(name);
  }

  @ApiOperation({ summary: "Quruvchini o'chirish" })
  @Delete(':id')
  async deleteBuilderById(@Param('id') id: string): Promise<number> {
    return this.builderService.deleteBuilderById(+id);
  }

  @ApiOperation({ summary: "Quruvchini o'zgartirish" })
  @Put(':id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    return this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
