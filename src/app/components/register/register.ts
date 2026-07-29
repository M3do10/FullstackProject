import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fname = '';
  lname = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.fname && !this.lname && !this.email && !this.password && !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields first.';
      return;
    }
    if (!this.fname) {
      this.errorMessage = 'Please fill first name first.';
      return;
    }
    if (!this.lname) {
      this.errorMessage = 'Please fill last name first.';
      return;
    }
    if (!this.email) {
      this.errorMessage = 'Please fill your e-mail first.';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Please fill your password first.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.successMessage =
        'A verification link has been sent to your email. Please verify your account before logging in.';
      this.fname = '';
      this.lname = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    }, 1500);
  }
}
