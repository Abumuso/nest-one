import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyRepo: typeof Company) {}

  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyRepo.create(createCompanyDto);
    return company;
  }

  async getAllCompany(): Promise<Company[]> {
    const companies = await this.companyRepo.findAll({
      include: { all: true },
    });
    return companies;
  }

  async getCompanyById(id: number): Promise<Company> {
    // const company = await this.companyRepo.findByPk(id)
    const company = await this.companyRepo.findOne({ where: { id } });
    return company;
  }

  async getCompanyByName(name: string): Promise<Company> {
    const company = await this.companyRepo.findOne({ where: { name } });
    return company;
  }

  async deleteCompanyById(id: number): Promise<number> {
    return this.companyRepo.destroy({ where: { id } });
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });

    console.log(company);

    return company[1][0].dataValues;
  }
}
