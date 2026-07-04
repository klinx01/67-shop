import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../shared/interfaces/IProduct';
import { PRODUCTS_DATA } from '../../shared/tokens/app-config.token';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private initialProducts: IProduct[] = inject(PRODUCTS_DATA);

  productsData: WritableSignal<IProduct[]> = signal<IProduct[]>(this.initialProducts);

  productsLength: Signal<number> = computed<number>(() => {
    return this.productsData().length;
  })

}
