import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { routableComponents } from './projects.routes';

@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
  ]
})
export class ProjectsModule { }
