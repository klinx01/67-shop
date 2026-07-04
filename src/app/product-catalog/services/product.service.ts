import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { PRODUCTS_DATA } from '../../shared/tokens/product.token';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { ProductApiService } from './product-api.service';
import { INewProduct } from '../interfaces/INewProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productApiService: ProductApiService = inject(ProductApiService);

  productsData: WritableSignal<IProduct[]> = signal<IProduct[]>([])

  productsLength: Signal<number> = computed<number>(() => {
    return this.productsData().length;
  })

  constructor() {
    this.setProducts();
  }

  setProducts() {
    this.productApiService.getProducts().pipe(
      tap((res: IProductResponse) => {
        this.productsData.set(res.products)
      })
    ).subscribe();
  }

  addProduct(newProduct: INewProduct) {
    return this.productApiService.addProduct(newProduct).pipe(
      tap((res: IProduct) => {
        this.productsData.update((products) => [...products, res])
      })
    ).subscribe()

  }

}
