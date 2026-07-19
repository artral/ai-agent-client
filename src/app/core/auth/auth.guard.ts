import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.checkSession().pipe(
    map(user => {
      if (user.isAuthenticated) {
        return true;
      } else {
        authService.login(); // Kick off flow on BFF backend
        return false;
      }
    })
  );
};
