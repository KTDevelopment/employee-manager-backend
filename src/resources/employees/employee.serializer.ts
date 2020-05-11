import { Employee } from './employee.entity';
import { classToPlain } from 'class-transformer';
import { Project } from '../projects/project.entity';
import { GetManyDefaultResponse } from '@nestjsx/crud/lib/interfaces';

export function serializeEmployees(employees: GetManyDefaultResponse<Employee> | Employee[]) {

  if ('data' in employees) {
    // @ts-ignore
    employees.data = employees.data.map(serializeEmployee);
    return employees;
  }

  return employees.map(serializeEmployee);
}

export function serializeEmployee(employee: Employee) {
  if (!employee.projects) {
    return classToPlain(employee);
  }

  return {
    ...classToPlain(employee),
    countedLanguages: countedLanguages(employee.projects),
  };
}

function countedLanguages(projects: Project[]) {
  let result = {};
  projects.forEach(project => {
    project.languages.forEach(language => {
      if (!Object.keys(result).includes(language)) {
        result[language] = 1;
      } else {
        result[language]++;
      }
    });
  });

  return sortKeysAlphabetical(result);
}

function sortKeysAlphabetical(object) {
  let ordered = {}
  Object.keys(object).sort().forEach(function(key) {
    ordered[key] = object[key];
  });

  return ordered;
}
