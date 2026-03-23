import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AtmService } from '../atm.service';


export const authGuard: CanActivateFn = () => {
  const atm = inject(AtmService);
  const router = inject(Router);

  // If logged in, allow navigation
  if (atm.isLoggedIn) {
    return true;
  }

  // If not logged in, redirect to login
  return router.createUrlTree(['/login']);
};
