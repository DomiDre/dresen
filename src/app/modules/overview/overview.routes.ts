import { LandingPageComponent } from './landing-page/landing-page.component';
import { Routes } from '@angular/router';
export const routableComponents = [
	LandingPageComponent
];


export const routes: Routes = [{
	path: '',
	component: LandingPageComponent
}
	
];