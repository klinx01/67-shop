
import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { products } from '../../data/mockProducts';
import { IProduct } from '../../interface/IProduct';
import { ProductFilter } from "../product-filter/product-filter";
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [ProductFilter, ProductCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  productsData: WritableSignal<IProduct[]> = signal<IProduct[]>(products as IProduct[]);
  searchQuery: WritableSignal<string> = signal<string>('');

  filteredProducts: Signal<IProduct[]> = computed<IProduct[]>(() => {
    const query: string = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return this.productsData();
    } else {
        return this.productsData().filter((p: IProduct) =>
          p.title.toLowerCase().includes(query)
        );
      }});

  onFilterChange(value: string): void {
    this.searchQuery.set(value);
  }

  handleAddToCart(productId: number): void {
    console.log(productId);
  }
}
