import { Controller, Get } from '@nestjs/common';
import { DataImportService } from './data-import.service';

@Controller('data-import')
export class DataImportController {

  constructor(private readonly dataImportService: DataImportService) {
  }

  @Get('')
  async doImport() {
    await this.dataImportService.import();
    return 'import finished';
  }
}
