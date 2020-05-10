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
    private readonly employeesService: EmployeesService,
  ) {
  }

  // @Cron(CronExpression.EVERY_HOUR)
  async import() {
    const employees = await this.loadEmployeesWithProjects();
    console.log('start import');
    await this.employeesService.save(employees);
    console.log('import finished');
  }

  private async loadEmployeesWithProjects(): Promise<Employee[]> {
    const allPlain = await this.httpService.get(this.configService.get('dataSource.employeesBaseUrL')).toPromise();
    return await Promise.all(
      allPlain.data.map(async (single: APIEmployeeData) => {
        const employee = plainToClass(Employee, { name: single.login });
        const projects = await this.getProjects(single.repos_url);
        employee.projects = projects;
        employee.languages = this.flatLanguagesFromProjects(projects);
        return employee;
      }),
    );
  }

  private async getProjects(url: string): Promise<Project[]> {
    const plainProjects = (await this.httpService.get(url).toPromise()).data;
    return await Promise.all(
      plainProjects.map(async (single: APIProjectData) => {
        const allLanguages = Object.keys((await this.httpService.get(single.languages_url).toPromise()).data);
        if(!allLanguages.includes(single.language)) {
          allLanguages.push(single.language)
        }
        return plainToClass(Project, {
          name: single.name,
          languages: allLanguages,
        });
      }),
    );
  }

  private flatLanguagesFromProjects(projects: Project[]) {
    let languages = [];
    projects.forEach(project => {
      project.languages.forEach(language => {
        if (!languages.includes(language)) {
          languages.push(language);
        }
      })
    })

    return languages;
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
