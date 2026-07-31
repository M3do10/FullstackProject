import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  emailTakenError = '';

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.emailTakenError = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const payload = {
      fname: this.registerForm.value.fname,
      lname: this.registerForm.value.lname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.signUp(payload).subscribe({
      next: (res: any) => {
        const message = (res && res.message) ? res.message.toLowerCase() : '';
        if (message.includes('already registered') || message.includes('taken') || message.includes('exist')) {
          this.emailTakenError = 'This email is already registered. Please log in or use another email.';
        } else {
          this.successMessage = 'A verification link has been sent to your email. Please verify your account before logging in.';
          this.registerForm.reset();
        }
      },
      error: (err: any) => {
        const msg = (err.error && err.error.message) ? err.error.message.toLowerCase() : '';
        if (msg.includes('already registered') || msg.includes('taken') || msg.includes('exist')) {
          this.emailTakenError = 'This email is already registered. Please log in or use another email.';
        } else {
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      }
    });
  }
}
