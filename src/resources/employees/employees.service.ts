import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployeesService extends TypeOrmCrudService<Employee> {
  constructor(@InjectRepository(Employee) repo) {
    super(repo);
  }

  async save(employee: Employee[] | Employee): Promise<Employee[] | Employee> {
    return this.repo.save(employee as any);
  }

  async clear() {
    return this.repo.clear();
  }
}
