import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () => import('@app/modules/overview/overview.module')
                        .then(m => m.OverviewModule),
    data: { animation: 'overview'}
  },
  {
    path: 'blog',
    loadChildren: () => import('@app/modules/blog/blog.module')
                        .then(m => m.BlogModule),
    data: { animation: 'blog'}
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/modules/admin/admin.module')
                        .then(m => m.AdminModule),
    data: { animation: 'admin'}
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
