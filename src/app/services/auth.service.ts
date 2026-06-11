import { Injectable, inject, runInInjectionContext, Injector } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect, signInWithCredential } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs'; // pega apenas o primeiro valor do Observable e transforma em um Promise
import { UserService } from '../services/user.service'
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
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
          let resultado; // variável para guardar o login, independente de onde vier

          if (Capacitor.isNativePlatform()) {
               console.log('1 - Fluxo Nativo (APK) iniciado');
               
               // abre a janelinha deslizante do Android e pega a credencial do Google
               const googleUser = await FirebaseAuthentication.signInWithGoogle();
               const idToken = googleUser.credential?.idToken;

               if (!idToken) {
                    throw new Error('Falha ao obter o token nativo do Google');
               }

               // converte o token nativo para um formato que o AngularFire entende
               const credential = GoogleAuthProvider.credential(idToken);
               
               // faz o login oficial no Firebase
               resultado = await signInWithCredential(this.auth, credential);

          } else {
               console.log('1 - Fluxo Web (Navegador) iniciado');
               
               const provider = new GoogleAuthProvider();
               resultado = await signInWithPopup(this.auth, provider);
          }

          console.log('2 - Login efetuado com sucesso', resultado.user.uid);

          const uid = resultado.user.uid;
          const usuario = await firstValueFrom(this.servicoUser.pegarUserProfile(uid));
          console.log('3 - usuario no firestore', usuario);

          if (!usuario?.uid) {
               console.log('4 - Criando perfil');
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
