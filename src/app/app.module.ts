import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';
import { EmployeesModule } from '../ressources/employees/employees.module';
import { DataImportModule } from '../data-import/data-import.module';
import { ProjectsModule } from '../ressources/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
    EmployeesModule,
    ProjectsModule,
    DataImportModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
