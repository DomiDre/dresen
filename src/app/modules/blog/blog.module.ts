import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';

import { BlogRoutingModule } from './blog-routing.module';
import { routableComponents } from './blog.routes';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    BlogRoutingModule
  ]
})
export class BlogModule { }
