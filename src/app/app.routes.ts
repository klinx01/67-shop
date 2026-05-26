import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home-page/home-page').then(m => m.HomePage),
    pathMatch: 'full'
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
