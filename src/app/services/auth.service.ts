import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs'; // pega apenas o primeiro valor do Observable e transforma em um Promise
import { UserService } from '../services/user.service'
// inject() é a funçao para injetar serviços
@Injectable({ // é um decorador
     providedIn: 'root',
})

export class AuthService {
     private auth = inject(Auth); // instancia do firebase
     private servicoUser = inject(UserService); // -> user.service.ts
     private injector = inject(Injector);

     cadastrar(email: string, senha: string) {
          return createUserWithEmailAndPassword(this.auth, email, senha);
     }

     entrar(email: string, senha: string) {
          return signInWithEmailAndPassword(this.auth, email, senha)
     }

     async entrarComGoogle() {
          const provider = new GoogleAuthProvider();
          console.log('1 - antes do popup');
          
          const resultado = await signInWithPopup(this.auth, provider); // trocar signInWithPopup para Redirect na hora de gerar apk final

          console.log('2 - depois do popup', resultado.user.uid);

          const uid = resultado.user.uid;
          const usuario = await firstValueFrom(this.servicoUser.pegarUserProfile(uid));
          console.log('3 - usuario no firestore', usuario);

          if (!usuario?.uid) {
                console.log('4 - criando perfil');
               this.servicoUser.criarUserProfile(uid, {
                    uid: uid,
                    name: resultado.user.displayName || '',
                    email: resultado.user.email || '',
                    profilePic: ''
               });
          }
     }


     sair() {
          return signOut(this.auth)
     }

     usuarioAtual$ = user(inject(Auth));
}
