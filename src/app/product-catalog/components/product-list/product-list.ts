import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { ProductFilter } from "../product-filter/product-filter";
import { ProductService } from '../../services/product.service';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {

  productService: ProductService = inject(ProductService);

  searchQuery: WritableSignal<string> = signal<string>('');
  QuantityProducts: Signal<number> = this.productService.productsLength;

  filteredProducts: Signal<IProduct[]> = computed<IProduct[]>(() => {
    const query: string = this.searchQuery().toLowerCase().trim();

    if (!query) {
      return this.productService.productsData();
    } else {
        return this.productService.productsData().filter((p: IProduct) =>
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
