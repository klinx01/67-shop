import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG } from './shared/tokens/app-config.token';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { authInterceptor } from './authentification/interceptors/auth-interceptor';
import { AuthService } from './authentification/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.checkAuthStatus(),
      deps: [AuthService],
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        authInterceptor,
        errorInterceptor
      ]),
    ),
    {
      provide: APP_CONFIG,
      useValue: {
        useMockData: false,
      },
    },
  ]
};
