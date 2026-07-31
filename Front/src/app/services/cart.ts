import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ProductItem } from './product';

export interface CartItem {
  product: ProductItem;
  quantity: number;
  _id?: string;
}

export interface CartData {
  _id?: string;
  user?: string;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';
  private cartSubject = new BehaviorSubject<CartData>({ items: [] });
  public cart$ = this.cartSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserCart();
    }
  }

  private getHeaders(): HttpHeaders {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders({ token });
  }

  loadUserCart(): void {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    if (!token) {
      this.cartSubject.next({ items: [] });
      return;
    }

    this.http.get<{ message: string; cart: CartData }>(this.baseUrl, { headers: this.getHeaders() })
      .subscribe({
        next: (res) => {
          if (res.cart && res.cart.items) {
            this.cartSubject.next(res.cart);
          } else {
            this.cartSubject.next({ items: [] });
          }
        },
        error: (err) => {
          this.cartSubject.next({ items: [] });
        }
      });
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    const headers = this.getHeaders();
    return new Observable(observer => {
      this.http.post<{ message: string; cart: CartData }>(this.baseUrl, { productId, quantity }, { headers })
        .subscribe({
          next: (res) => {
            if (res.cart) {
              this.cartSubject.next(res.cart);
            }
            observer.next(res);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    const headers = this.getHeaders();
    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }

    return new Observable(observer => {
      this.http.put<{ message: string; cart: CartData }>(this.baseUrl, { productId, quantity }, { headers })
        .subscribe({
          next: (res) => {
            if (res.cart) {
              this.cartSubject.next(res.cart);
            }
            observer.next(res);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  removeFromCart(productId: string): Observable<any> {
    const headers = this.getHeaders();
    return new Observable(observer => {
      this.http.delete<{ message: string; cart: CartData }>(`${this.baseUrl}/${productId}`, { headers })
        .subscribe({
          next: (res) => {
            if (res.cart) {
              this.cartSubject.next(res.cart);
            }
            observer.next(res);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          }
        });
    });
  }

  getItemQuantity(productId: string): number {
    const currentCart = this.cartSubject.value;
    if (!currentCart || !currentCart.items) return 0;
    const item = currentCart.items.find(i => i.product && i.product._id === productId);
    return item ? item.quantity : 0;
  }

  getCartCount(): number {
    const currentCart = this.cartSubject.value;
    if (!currentCart || !currentCart.items) return 0;
    return currentCart.items.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    const currentCart = this.cartSubject.value;
    if (!currentCart || !currentCart.items) return 0;
    return currentCart.items.reduce((total, item) => {
      const price = item.product ? item.product.price : 0;
      return total + (price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    const headers = this.getHeaders();
    this.http.delete<{ message: string; cart: CartData }>(this.baseUrl, { headers })
      .subscribe({
        next: () => {
          this.cartSubject.next({ items: [] });
        },
        error: () => {
          this.cartSubject.next({ items: [] });
        }
      });
  }
}
