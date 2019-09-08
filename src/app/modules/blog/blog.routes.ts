import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { OverviewComponent } from './overview/overview.component';

export const routableComponents = [
	PostComponent,
	OverviewComponent
];


export const routes: Routes = [
	{
		path: '',
		component: OverviewComponent
	},
	{
		path: 'post',
		component: PostComponent
	}
];
