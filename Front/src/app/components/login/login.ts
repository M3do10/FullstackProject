import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          if (res.fname) localStorage.setItem("fname", res.fname);
          this.authService.setAuth(res.token, res.fname);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = res.message || 'Email or password incorrect.';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Email or password incorrect.';
      }
    });
  }
}
