import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { routableComponents } from './about-me.routes';

@NgModule({
  declarations: routableComponents,
  imports: [
    CommonModule,
    SharedModule,
    AboutMeRoutingModule,

  ]
})
export class AboutMeModule { }
