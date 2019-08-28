import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { OverviewRoutingModule } from './overview-routing.module';
import { routableComponents } from './overview.routes';


@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
