import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

export const routableComponents = [
  OverviewComponent
];


export const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];
