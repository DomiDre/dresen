import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
export const routableComponents = [
	AboutComponent
];

export const routes: Routes = [
	{
		path: '',
		component: AboutComponent
	}
];
