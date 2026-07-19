import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfile } from '../models/uder.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signals handle the reactive state of the current user session
  public currentUser = signal<UserProfile | null>(null);

  constructor(private http: HttpClient) {}

  // Checks cookie validity against BFF session endpoint on startup
  checkSession(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/auth/user').pipe(
      tap(user => this.currentUser.set(user)),
      catchError(() => {
        const anonymousUser: UserProfile = { isAuthenticated: false, username: '', email: '', roles: [] };
        this.currentUser.set(anonymousUser);
        return of(anonymousUser);
      })
    );
  }

  // Seamlessly hands off authentication initiation to the backend
  login(): void {
    window.location.href = '/api/auth/login';
  }

  logout(): void {
    window.location.href = '/api/auth/logout';
  }

  hasRole(requiredRoles: string[]): boolean {
    const user = this.currentUser();
    if (!user || !user.isAuthenticated) return false;
    return requiredRoles.some(role => user.roles.includes(role));
  }
}
