import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home-page/home-page').then(m => m.HomePage),
    pathMatch: 'full'
  },

  {
    path: 'cart',
    loadComponent: () => import('./components/home-page/home-page').then(m => m.HomePage), 
    canActivate: [authGuard]
  },

  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound)
  },

  {
    path: '**',
    redirectTo: '404'
  }
];
