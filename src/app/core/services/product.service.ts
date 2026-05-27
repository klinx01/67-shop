import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { products } from '../../data/mockProducts';
import { IProduct } from '../../interface/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  productsData: WritableSignal<IProduct[]> = signal<IProduct[]>(products as IProduct[]);

  productsLength: Signal<number> = computed<number>(() => {
    return this.productsData().length;
  })

}
