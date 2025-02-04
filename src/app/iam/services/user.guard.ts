import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs";
import {TokenService} from "../../shared/services/token.service";

export const userGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const authenticationService = inject(AuthService);
  const router = inject(Router);
  let token = localStorage.getItem('token');
  if (token && tokenService.getRoleFromToken(token) === 'ROLE_USER') {
    return true;
  }
  router.navigate(['/tickets-and-sessions']).then();
  return false;
};
