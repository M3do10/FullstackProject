import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService, ProductItem } from '../../services/product';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit, OnDestroy {
  products: ProductItem[] = [];
  filteredProducts: ProductItem[] = [];
  isLoading = true;
  errorMessage = '';

  searchQuery = '';
  selectedCategory = 'All';
  selectedSort = 'default';

  categories = ['All', 'Electronics', 'Clothing','Books', 'Home', 'Sports'];

  private cartSub!: Subscription;
  private authSub!: Subscription;
  isLoggedIn = false;

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

    this.fetchProducts();

    this.cartSub = this.cartService.cart$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) this.cartSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.products = res.products || [];
        this.applyFilters();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load products. Please check server connection.';
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    let result = [...this.products];

    // Filter by Category
    if (this.selectedCategory !== 'All') {
      result = result.filter(
        p => p.category && p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query (Name or Category)
    if (this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Sort by Price
    if (this.selectedSort === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
    this.cdr.detectChanges();
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
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
    event.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
  }
}
