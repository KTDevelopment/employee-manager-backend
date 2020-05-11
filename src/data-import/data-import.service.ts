import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { Employee } from '../resources/employees/employee.entity';
import { EmployeesService } from '../resources/employees/employees.service';
import { Project } from '../resources/projects/project.entity';
import { CountedLanguage } from '../resources/counted-language/counted-language.entity';

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
    Logger.log('start import');
    const employees = await this.loadEmployeesWithProjects();
    Logger.log('clear DB');
    await this.employeesService.clear();
    Logger.log('populate DB');
    await this.employeesService.save(employees);
    Logger.log('import finished');
  }

  private async loadEmployeesWithProjects(): Promise<Employee[]> {
    const allPlain = await this.httpService.get(this.configService.get('dataSource.employeesBaseUrL')).toPromise();
    return await Promise.all(
      allPlain.data.map(async (single: APIEmployeeData) => {
        const employee = plainToClass(Employee, { name: single.login });
        employee.projects = await this.getProjects(single.repos_url);
        employee.countedLanguages = this.createCountedLanguages(employee.projects);
        return employee;
      }),
    );
  }

  private async getProjects(url: string): Promise<Project[]> {
    const plainProjects = (await this.httpService.get(url).toPromise()).data;
    return await Promise.all(
      plainProjects.map(async (single: APIProjectData) => {
        const allLanguages = Object.keys((await this.httpService.get(single.languages_url).toPromise()).data);
        return plainToClass(Project, {
          name: single.name,
          languages: allLanguages,
        });
      }),
    );
  }

  private createCountedLanguages(projects: Project[]): CountedLanguage[] {
    let result: CountedLanguage[] = [];
    projects.forEach(project => {
      project.languages.forEach(language => {
        const candidate = result.find(it => it.name === language);
        if (candidate) {
          candidate.count++;
        } else {
          result.push(plainToClass(CountedLanguage, { name: language, count: 1 }));
        }
      });
    });

    return result.sort((a,b) => a.name.localeCompare(b.name));
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
