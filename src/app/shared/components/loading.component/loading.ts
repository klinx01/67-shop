import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  standalone: true
})
export class Loading {
  readonly loadingService: LoadingService = inject(LoadingService);
}
