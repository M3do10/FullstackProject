import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isLoggedIn = false;
  userName = 'User';
  isDropdownOpen = false;
  cartCount = 0;
  private authSub!: Subscription;
  private cartSub!: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authSub = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userName = user?.fname && user.fname !== 'undefined' ? user.fname : 'User';
      if (this.isLoggedIn) {
        this.cartService.loadUserCart();
      }
      this.cdr.detectChanges();
    });

    this.cartSub = this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
      this.cdr.detectChanges();
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
    if (this.cartSub) this.cartSub.unsubscribe();
  }

  logout() {
    this.isDropdownOpen = false;
    this.authService.logout();
  }
}
