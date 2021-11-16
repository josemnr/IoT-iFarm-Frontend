import { 
  Routes, 
  RouterModule, 
  PreloadAllModules 
} from '@angular/router';
import { NgModule } from '@angular/core';

import {LayoutComponent} from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => 
    import('./modules/login/login.module').then(
      m => m.LoginModule
    )
  },
  {
    path: 'register',
    loadChildren: () => 
    import('./modules/register/register.module').then(
      m => m.RegisterModule
    )
  },
  {
    path: 'home',
    loadChildren: () => 
    import('./modules/home/home.module').then(
      m => m.HomeModule
    )
  },
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'tracing',
        loadChildren: () => 
        import('./modules/tracing/tracing.module').then(
          m => m.TracingModule
        )
      },
      {
        path: 'users',
        loadChildren: () => 
        import('./modules/users/users.module').then(
          m => m.UsersModule
        )
      },
      {
        path: 'creation',
        loadChildren: () => 
        import('./modules/creation/creation.module').then(
          m => m.CreationModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
