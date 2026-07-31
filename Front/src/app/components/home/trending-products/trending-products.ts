import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductService, ProductItem } from '../../../services/product';
import { CartService } from '../../../services/cart';
import { AuthService } from '../../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './trending-products.html',
  styleUrl: './trending-products.css',
})
export class TrendingProducts implements OnInit, OnDestroy {
  trendingProducts: ProductItem[] = [];
  isLoading = true;
  isLoggedIn = false;

  private authSub!: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    this.fetchTrendingProducts();
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  fetchTrendingProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.products && Array.isArray(res.products)) {
          const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];
          const items: ProductItem[] = [];
          
          for (const cat of categories) {
            const found = res.products.find(
              (p: ProductItem) => p.category && p.category.toLowerCase() === cat.toLowerCase()
            );
            if (found) {
              items.push(found);
            }
          }
          this.trendingProducts = items;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching trending products from API:', err);
        this.cdr.detectChanges();
      }
    });
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

  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x200?text=Product';
  }
}
