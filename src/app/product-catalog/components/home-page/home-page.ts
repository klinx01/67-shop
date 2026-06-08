import { Component, inject } from '@angular/core';
import { ProductList } from "../product-list/product-list";
import { AuthService } from '../../../core/services/auth.service';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-home-page',
  imports: [ProductList, Header],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

  public readonly authService = inject(AuthService);

}
