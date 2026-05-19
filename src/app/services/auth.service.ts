import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
// inject() é a funçao para injetar serviços
@Injectable({ // é um decorador
     providedIn: 'root',
})

export class AuthService {
     private auth = inject(Auth); // instancia do firebase

     cadastrar(email: string, senha: string) {
          return createUserWithEmailAndPassword(this.auth, email, senha);
     }

     entrar(email: string, senha: string) {
          return signInWithEmailAndPassword(this.auth, email, senha)
     }

     entrarComGoogle() { //serve tanto para login, tanto para cadastro
          const provider = new GoogleAuthProvider(); // google autentica, não o firebase
          return signInWithPopup(this.auth, provider)
     }
     

     sair() {
          return signOut(this.auth)
     }

     usuarioAtual$ = user(this.auth);
}
