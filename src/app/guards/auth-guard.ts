import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
     const authService = inject(AuthService)
     const router = inject(Router)

     return authService.usuarioAtual$.pipe(
          map(usuario => {
               if (usuarioAtual) {
                    return true;
               } else {
                    router.navigate(['/splash']);
                    return false;
               }
          })
     )
};
