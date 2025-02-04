import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {map, take} from "rxjs";

export const authenticationGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthService);
  const router = inject(Router);
  return authenticationService.isSignedIn.pipe(
    take(1), map(isSignedIn => {
      if (isSignedIn) return true;
      router.navigate(['/']).then();
      return false;
    }));
};
