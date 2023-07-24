import { Module } from '@nestjs/common';
import { MachineDriverController } from './machine_driver.controller';
import { Machine_driverService } from './machine_driver.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Machine_driver } from './models/machine_driver.model';

@Module({
  imports: [SequelizeModule.forFeature([Machine_driver])],
  controllers: [MachineDriverController],
  providers: [Machine_driverService],
})
export class MachineDriverModule {}
