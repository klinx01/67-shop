import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);
  const router: Router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500 && error.status <= 599) {
        messageService.showMessage(`Ошибка: Сервер временно недоступен, попробуйте позже`);
      }
      
      switch (error.status) {
        case 0:
          messageService.showMessage('Ошибка: Плохое интернет соединение!')
          break;
        case 400:
          messageService.showMessage('Ошибка: Неверно заполнены поля формы');
          break;
        case 401:
          messageService.showMessage('Ошибка: Пользователь не залогинен');
          router.navigate(['/auth'])
          break;
        case 404:
          router.navigate(['**'])
          messageService.showMessage('Ошибка: Данные не найдены');
          break;
        default:
          messageService.showMessage('Произошла непредвиденная ошибка');
          break;
      }
      return throwError(() => error);
    })
  );
};