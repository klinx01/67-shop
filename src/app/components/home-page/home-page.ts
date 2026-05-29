import { Component, inject } from '@angular/core';
import { ProductList } from "../product-list/product-list";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  public readonly authService = inject(AuthService);

}
