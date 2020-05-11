import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
  ],
})
export class CountedLanguageModule {}
