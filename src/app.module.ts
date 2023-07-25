import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './company/models/company.model';
import { DriverModule } from './driver/driver.module';
import { BuilderModule } from './builder/builder.module';
import { MachineModule } from './machine/machine.module';
import { Driver } from './driver/models/driver.model';
import { Machine } from './machine/models/machine.model';
import { Builder } from './builder/models/builder.model';
import { MachineDriverModule } from './machine_driver/machine_driver.module';
import { Machine_driver } from './machine_driver/models/machine_driver.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/role.model';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { UserRoles } from './roles/models/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.model';
import { FilesModule } from './files/files.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Company,
        Driver,
        Machine,
        Builder,
        Machine_driver,
        Role,
        User,
        UserRoles,
        Post,
      ],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    MachineModule,
    BuilderModule,
    DriverModule,
    MachineDriverModule,
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
