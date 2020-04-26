import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    // This method returns an 'observable' with an 'Iproduct[] array' (type generics)
    return this.http.get<IProduct[]>(this.productUrl);
    // Map our returned response to the foramt of an 'Iproduct[] array'
  }
}
