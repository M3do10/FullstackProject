import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isLoggedIn = false;
  private cartSub!: Subscription;
  private authSub!: Subscription;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.cartService.loadUserCart();
      }
      this.cdr.detectChanges();
    });

    this.cartSub = this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart?.items || [];
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

  increment(item: CartItem): void {
    if (!item.product) return;
    this.cartService.updateQuantity(item.product._id, item.quantity + 1).subscribe({
      next: () => this.cdr.detectChanges()
    });
  }

  decrement(item: CartItem): void {
    if (!item.product) return;
    this.cartService.updateQuantity(item.product._id, item.quantity - 1).subscribe({
      next: () => this.cdr.detectChanges()
    });
  }

  removeItem(item: CartItem): void {
    if (!item.product) return;
    this.cartService.removeFromCart(item.product._id).subscribe({
      next: () => this.cdr.detectChanges()
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  get subtotal(): number {
    return this.cartService.getCartTotal();
  }

  get shipping(): number {
    return this.subtotal > 0 ? 0 : 0; // Free shipping
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/100?text=Product';
  }
}
