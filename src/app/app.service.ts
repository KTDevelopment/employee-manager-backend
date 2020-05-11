import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return {
      message: 'Welcome to backend!',
      resources: [
        '/employees',
        '/projects'
      ],
      dataImport: '/data-import',
      documentation: '/documentation',
      listAllEmployeesRankedByLanguage: '/employees?filter=countedLanguages.name||$eq||Java&sort=countedLanguages.count,DESC'
    };
  }
}
