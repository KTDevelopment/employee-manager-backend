import { Controller } from '@nestjs/common';
import { Employee } from './employee.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@Crud({
  model: {
    type: Employee
  },
})
@ApiTags('employees')
@Controller('employees')
export class EmployeesController implements CrudController<Employee> {
  constructor(public service: EmployeesService) {
  }
}
