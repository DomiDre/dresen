import { Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { RemovePostComponent } from './remove-post/remove-post.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

export const routableComponents = [
	AddPostComponent,
	RemovePostComponent,
	LoginComponent
];


export const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'addPost',
		component: AddPostComponent,
		canActivate: [AngularFireAuthGuard]
	},
	{
		path: 'removePost',
		component: RemovePostComponent,
		canActivate: [AngularFireAuthGuard]
	}
];
