import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, ProductItem } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  product: ProductItem | null = null;
  isLoading = true;
  errorMessage = '';
  isLoggedIn = false;

  private cartSub!: Subscription;
  private authSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.cartSub = this.cartService.cart$.subscribe(() => {
      this.cdr.detectChanges();
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProduct(id);
      } else {
        this.isLoading = false;
        this.errorMessage = 'Product ID not provided.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

  fetchProduct(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.product) {
          this.product = res.product;
        } else {
          this.errorMessage = 'Product not found.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Product not found or failed to load.';
        console.error('Error loading product details:', err);
        this.cdr.detectChanges();
      }
    });
  }

  getQuantity(productId: string): number {
    return this.cartService.getItemQuantity(productId);
  }

  addToCart(product: ProductItem): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product._id, 1).subscribe({
      next: () => this.cdr.detectChanges(),
      error: (err) => console.error('Error adding to cart:', err)
    });
  }

  incrementQuantity(productId: string): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    const currentQty = this.getQuantity(productId);
    this.cartService.updateQuantity(productId, currentQty + 1).subscribe({
      next: () => this.cdr.detectChanges(),
      error: (err) => console.error('Error incrementing quantity:', err)
    });
  }

  decrementQuantity(productId: string): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    const currentQty = this.getQuantity(productId);
    this.cartService.updateQuantity(productId, currentQty - 1).subscribe({
      next: () => this.cdr.detectChanges(),
      error: (err) => console.error('Error decrementing quantity:', err)
    });
  }

  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
  }
}
