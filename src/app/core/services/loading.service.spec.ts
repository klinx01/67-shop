import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { firstValueFrom } from 'rxjs';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set loading to true when show() is called', async () => {
    service.show();

    expect(await firstValueFrom(service.loading$)).toBe(true);
  });

  it('should set loading to false when hide() is called', async () => {
    service.hide();

    expect(await firstValueFrom(service.loading$)).toBe(false);
  });
});
