
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { WebLayoutComponent } from './layouts/web/web-layout.component';
import { AuthGuard } from './_helpers/auth.guard';


export const AppRoutes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    component: AuthLayoutComponent,
    loadChildren: () => import('./authentication/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'book-list',
        loadChildren: () => import('./book-list/book-list.module').then(m => m.BookListModule)
      },
    ]
  },
 {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {
})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
