import { Controller } from '@nestjs/common';
import { Employee } from './employee.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@Crud({
  model: {
    type: Employee,
  },
  query: {
    join: {
      projects: {},
      countedLanguages: { eager: true },
    },
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'deleteOneBase', 'replaceOneBase', 'updateOneBase'],
  },
})
@ApiTags('employees')
@Controller('employees')
export class EmployeesController implements CrudController<Employee> {
  constructor(public service: EmployeesService) {
  }
}
