import { Component, signal, WritableSignal } from '@angular/core';
import { HomePage } from "./components/home-page/home-page";

@Component({
  selector: 'app-root',
  imports: [HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  protected readonly title: WritableSignal<string> = signal('67-shop');


}
