import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ message: string; products: ProductItem[] }> {
    return this.http.get<{ message: string; products: ProductItem[] }>(this.baseUrl);
  }

  getProductById(id: string): Observable<{ message: string; product: ProductItem }> {
    return this.http.get<{ message: string; product: ProductItem }>(`${this.baseUrl}/${id}`);
  }
}
