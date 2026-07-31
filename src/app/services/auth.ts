import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private currentUserSubject = new BehaviorSubject<{fname: string, token: string} | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const fname = localStorage.getItem('fname');
      if (token) {
        this.currentUserSubject.next({ token, fname: fname || 'User' });
      }
    }
  }

  signUp(userData: { fname: string; lname: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  setAuth(token: string, fname?: string) {
    const userFname = fname || (isPlatformBrowser(this.platformId) ? localStorage.getItem('fname') : null) || 'User';
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('fname', userFname);
    }
    this.currentUserSubject.next({ token, fname: userFname });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('fname');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
