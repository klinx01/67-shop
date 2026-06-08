import { Component, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.scss',
})
export class ProductFilter {

  searchChange: OutputEmitterRef<string> = output<string>();

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }
}
