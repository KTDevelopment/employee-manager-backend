import { Controller } from '@nestjs/common';
import { Employee } from './employee.entity';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { serializeEmployee, serializeEmployees } from './employee.serializer';

@Crud({
  model: {
    type: Employee,
  },
  query: {
    join: {
      projects: {},
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

  get base(): CrudController<Employee> {
    return this;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest) {
    return serializeEmployee(await this.base.getOneBase(req));
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    return serializeEmployees(await this.base.getManyBase(req));
  }
}
