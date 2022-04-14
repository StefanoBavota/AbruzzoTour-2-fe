import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./core/components/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('./features/pages/demo/demo.module').then(m => m.DemoPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./features/pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./features/pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'navigation/:pathId',
    loadChildren: () => import('./features/pages/navigation/navigation.module').then( m => m.NavigationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
