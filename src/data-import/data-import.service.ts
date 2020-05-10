import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { Employee } from '../ressources/employees/employee.entity';
import { EmployeesService } from '../ressources/employees/employees.service';
import { Project } from '../ressources/projects/project.entity';

@Injectable()
export class DataImportService {
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
    private readonly employeesService: EmployeesService
  ) {
  }

  // @Cron(CronExpression.EVERY_HOUR)
  async import() {
    const employees = await this.loadEmployeesWithProjects();
    await this.employeesService.save(employees);
    console.log('from db', await this.employeesService.find());
  }

  private async loadEmployeesWithProjects(): Promise<Employee[]> {
    const allPlain = await this.httpService.get(this.configService.get('dataSource.employeesBaseUrL')).toPromise();
    return await Promise.all(
      allPlain.data.map(async (single: APIEmployeeData) => {
        const employee = await this.getEmployee(single.url);
        const projects = await this.getProjects(single.repos_url);
        console.log('projects: ', projects);
        return employee;
      })
    );
  }

  private async getEmployee(url: string): Promise<Employee> {
    const plain = (await this.httpService.get(url).toPromise()).data;
    if (plain.name === null) {
      plain.name = plain.login;
    }
    return plainToClass(Employee, plain);
  }

  private async getProjects(url: string): Promise<Project[]> {
    const plainProjects = (await this.httpService.get(url).toPromise()).data;
    return await Promise.all(
      plainProjects.map(async (single: APIProjectData) => {
        const allLanguages = (await this.httpService.get(single.languages_url).toPromise()).data;
        return plainToClass(Project, { name: single.name, mainLanguage: single.language, languages: allLanguages });
      })
    );
  }
}

interface APIProjectData {
  name: string,
  languages_url: string,
  language: string
}

interface APIEmployeeData {
  login: string
  url: string,
  repos_url: string,
}
