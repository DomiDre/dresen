import { Routes } from '@angular/router';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

export const routableComponents = [
	DisclaimerComponent
];


export const routes: Routes = [
	{
		path: '',
		component: DisclaimerComponent
	}
];
