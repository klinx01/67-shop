import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { IProduct } from '../interfaces/IProduct';
import { INewProduct } from '../interfaces/INewProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  http: HttpClient = inject(HttpClient);

  getProducts(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>('https://dummyjson.com/products')
  }

  addProduct(newProduct: INewProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://dummyjson.com/products/add', newProduct)
  }

}