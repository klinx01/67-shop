import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { Observable, tap } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { ProductApiService } from './product-api.service';
import { INewProduct } from '../interfaces/INewProduct';
import { products } from '../../shared/data/mockProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productApiService: ProductApiService = inject(ProductApiService);

  productsData: WritableSignal<IProduct[]> = signal<IProduct[]>([])
  skip: number = 0;
  limit: number = 15;
  totalRecords: number = 0;

  productsLength: Signal<number> = computed<number>(() => {
    return this.productsData().length;
  })

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productApiService.getProducts(this.limit, this.skip).pipe(
      tap((res: IProductResponse | IProduct[]) => {
        if (Array.isArray(res)) {
          this.productsData.set(res);
          this.totalRecords = products.length;
        } else {
          this.productsData.set(res.products);
          this.totalRecords = res.total;
        }
      })
    ).subscribe();
  }

  addProduct(newProduct: INewProduct): Observable<IProduct> {
    return this.productApiService.addProduct(newProduct).pipe(
      tap((res: IProduct) => {
        this.productsData.update((products) => [...products, res])
      })
    )
  }

}
