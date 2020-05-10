import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Crud({
  model: {
    type: Project,
  },
})
@ApiTags('projects')
@Controller('projects')
export class ProjectsController implements CrudController<Project> {
  constructor(public service: ProjectsService) {
  }
}
