import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { IProduct } from '../interfaces/IProduct';
import { INewProduct } from '../interfaces/INewProduct';
import { IAppConfig } from '../../shared/interfaces/IAppConfig';
import { APP_CONFIG } from '../../shared/tokens/app-config.token';
import { products } from '../../shared/data/mockProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  http: HttpClient = inject(HttpClient);
  private readonly config: IAppConfig = inject(APP_CONFIG);

  getProducts(): Observable<IProduct[] | IProductResponse> {
    if (this.config.useMockData) {
      return of(products);
    }

    return this.http.get<IProductResponse>('https://dummyjson.com/products')
  }

  addProduct(newProduct: INewProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://dummyjson.com/products/add', newProduct)
  }

}