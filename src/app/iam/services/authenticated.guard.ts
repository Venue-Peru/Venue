import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs";
import {TokenService} from "../../shared/services/token.service";

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);
  let token = localStorage.getItem('token');
  if (token == null) {
    return true;
  }
  router.navigate(['/tickets-and-sessions']).then();
  return false;
};

