import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
export const routableComponents = [
  PostComponent
];


export const routes: Routes = [
	{
		path: '',
		component: PostComponent
	}
];
