import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { products } from './shared/data/mockProducts';
import { PRODUCTS_DATA } from './shared/tokens/product.token';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: PRODUCTS_DATA,
      useValue: products
    }
  ]
};
