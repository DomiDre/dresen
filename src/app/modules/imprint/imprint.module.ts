import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ImprintRoutingModule } from './imprint-routing.module';
import { routableComponents } from './imprint.routes';

@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    ImprintRoutingModule,
  ]
})
export class ImprintModule { }
