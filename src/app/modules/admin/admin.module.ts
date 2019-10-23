import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { routableComponents } from './admin.routes';
import { SharedModule } from '@shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class AdminModule { }
