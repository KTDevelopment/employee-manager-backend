import { HttpModule, Module } from '@nestjs/common';
import { DataImportService } from './data-import.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeesModule } from '../ressources/employees/employees.module';
import { EmployeesService } from '../ressources/employees/employees.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        headers: {
          Authorization: 'token ' + configService.get('dataSource.token')
        }
      }),
      inject: [ConfigService]
    }),
    EmployeesModule
  ],
  providers: [DataImportService]
})
export class DataImportModule {
}
