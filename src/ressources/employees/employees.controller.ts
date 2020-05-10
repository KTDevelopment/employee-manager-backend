import { Controller, Get } from '@nestjs/common';
import { Employee } from './employee.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@Crud({
  model: {
    type: Employee
  },
  query: {
    join: {
      projects: {},
    }
  },
})
@ApiTags('employees')
@Controller('employees')
export class EmployeesController implements CrudController<Employee> {
  constructor(public service: EmployeesService) {
  }

  @Get('/projectOverview')
  async handleProjectOverview() {
    const employees = await this.service.find();
    return employees.map(employee => {
      return {
        name: employee.name,
        languages: employee.languages.map(language => {
          return {
            [language]: employee.projects.filter(project => project.languages.includes(language)).length
          }
        })
      }
    })
  }
}
