import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';

@Crud({
  model: {
    type: Project
  }
})
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
}
