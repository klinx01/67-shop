import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/IProduct';
import { ProductFilter } from "../product-filter/product-filter";
import { ProductService } from '../../services/product.service';
import { ProductCard } from "../product-card/product-card";
import { Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-product-list',
  imports: [ProductFilter, ProductCard, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductList {

  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);

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

  redirectToCreateProduct(): void {
    this.router.navigate(['/create-product']);
  }

}
