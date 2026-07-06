import { Routes } from '@angular/router';
import { authGuard } from './authentification/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./product-catalog/components/home-page/home-page').then(m => m.HomePage)
      },
      {
        path: 'create-product',
        loadComponent: () => import('./product-catalog/components/create-product/create-product').then(m => m.CreateProduct),
      },
      {
        path: 'cart',
        loadComponent: () => import('./product-catalog/components/cart/cart').then(m => m.Cart),
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./authentification/components/auth/auth').then(m => m.Auth)
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
