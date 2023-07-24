import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './models/company.model';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Kompaniyalar')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Kompaniya yaratish' })
  @Post('create')
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @ApiOperation({ summary: "Kompaniyalarni ko'rish" })
  @Get('all')
  async getAllCompany(): Promise<Company[]> {
    return this.companyService.getAllCompany();
  }

  @ApiOperation({ summary: "Kompaniyani id bo'yicha ko'rish" })
  @Get(':id')
  async getCompanyBYId(@Param('id') id: string): Promise<Company> {
    return this.companyService.getCompanyById(+id);
  }

  @ApiOperation({ summary: "Kompaniyani nom bo'yicha ko'rish" })
  @Get(':name')
  async getCompanyByName(@Param('name') name: string): Promise<Company> {
    return this.companyService.getCompanyByName(name);
  }

  @ApiOperation({ summary: "Kompaniyani o'chirish" })
  @Delete(':id')
  async deleteCompanyById(@Param('id') id: string): Promise<number> {
    return this.companyService.deleteCompanyById(+id);
  }

  @ApiOperation({ summary: "Kompaniyani o'zgartirish" })
  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }
}
