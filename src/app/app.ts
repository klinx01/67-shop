import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer';
import { Header } from "./shared/components/header/header";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title: WritableSignal<string> = signal('67-shop');


}
