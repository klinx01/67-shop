import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { products } from './shared/data/mockProducts';
import { PRODUCTS_DATA } from './shared/tokens/product.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: PRODUCTS_DATA,
      useValue: products
    }
  ]
};
