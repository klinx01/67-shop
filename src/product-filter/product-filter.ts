import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { products } from '../mockData/mockData'
import { IProduct } from '../interfaces/IProduct';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.scss',
})
export class ProductFilter {

  products: WritableSignal<IProduct[]> = signal(products as IProduct[]);
  searchQuery: WritableSignal<string> = signal('');

  filteredProducts: Signal<IProduct[]> = computed<IProduct[]>(() => {
    const query: string = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return this.products();
    } else {
      return this.products().filter((p: IProduct) => {
        return p.title.toLowerCase().includes(query);
      })
    }
  })

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

}
