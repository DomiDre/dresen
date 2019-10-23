import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { BlogRoutingModule } from './blog-routing.module';
import { routableComponents } from './blog.routes';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class BlogModule { }
