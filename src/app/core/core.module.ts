import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '@shared/shared.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavigationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ],
})
export class CoreModule { }
