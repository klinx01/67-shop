import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CreateProduct } from './create-product';
import { APP_CONFIG } from '../../../shared/tokens/app-config.token';
import { Router } from '@angular/router';

describe('CreateProduct', () => {
  let component: CreateProduct;
  let fixture: ComponentFixture<CreateProduct>;

  const routerMock = {
    navigate: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProduct],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: {
            apiUrl: 'https://dummyjson.com'
          }
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid initially', () => {
    expect(component.createProductForm.valid).toBeFalsy();
  });

  it('should navigate on valid submit', () => {
    component.createProductForm.setValue({
      title: 'Product name',
      category: 'Category',
      description: 'Some long description',
      price: 100
    });

    component.onSubmit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('should invalidate name shorter than 4 chars', () => {
    component.createProductForm.setValue({
      title: 'abc',
      category: 'Valid category',
      description: 'Valid description',
      price: 10
    });

    expect(component.createProductForm.controls['title'].valid).toBeFalsy();
  });

  it('should invalidate price less than 1', () => {
    component.createProductForm.setValue({
      title: 'Valid name',
      category: 'Valid category',
      description: 'Valid description',
      price: 0
    });
    expect(component.createProductForm.controls['price'].valid).toBeFalsy();
  });

  it('should invalidate category shorter than 4 chars', () => {
    component.createProductForm.setValue({
      title: 'Valid name',
      category: 'abc',
      description: 'Valid description',
      price: 10
    });
    expect(component.createProductForm.controls['category'].valid).toBeFalsy();
  });

  it('should not navigate when form is invalid', () => {
    routerMock.navigate.mockClear();

    component.createProductForm.setValue({
      title: '',
      category: '',
      description: '',
      price: 0
    });
    component.onSubmit();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should invalidate description shorter than 4 chars', () => {
    component.createProductForm.setValue({
      title: 'Valid name',
      category: 'Valid category',
      description: 'abc',
      price: 10
    });
    expect(component.createProductForm.controls['description'].valid).toBeFalsy();
  });

  it('should be valid when all fields are correct', () => {
    component.createProductForm.setValue({
      title: 'Product name',
      category: 'Category',
      description: 'Some description',
      price: 100
    });

    expect(component.createProductForm.valid).toBeTruthy();
  });

});
