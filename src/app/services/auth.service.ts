import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, user, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs'; // pega apenas o primeiro valor do Observable e transforma em um Promise
import { UserService } from '../services/user.service'
// inject() é a funçao para injetar serviços
@Injectable({ // é um decorador
     providedIn: 'root',
})

export class AuthService {
     private auth = inject(Auth); // instancia do firebase
     private servicoUser = inject(UserService); // -> user.service.ts

     cadastrar(email: string, senha: string) {
          return createUserWithEmailAndPassword(this.auth, email, senha);
     }

     entrar(email: string, senha: string) {
          return signInWithEmailAndPassword(this.auth, email, senha)
     }

     async entrarComGoogle() { //serve tanto para login, tanto para cadastro
          const provider = new GoogleAuthProvider(); // google autentica, não o firebase
          const resultado = await signInWithPopup(this.auth, provider) // tem todas as info do user
          const uid = resultado.user.uid; //pega apenas o uid do user que a var 'resultado' trouxe
          const usuario = await firstValueFrom(this.servicoUser.pegarUserProfile(uid)); // pega o uid especificado anteriormente no firestore

          if (usuario === undefined) {
               this.servicoUser.criarUserProfile(uid, {
                    uid: uid,
                    name: resultado.user.displayName || '', //na interface EXIGE string, então para evitar erro colocamos o || ''
                    email: resultado.user.email || '', // é como se fosse: se retornar um valor, perfeito! Se não, volte uma string vazia
                    profilePic: ''
               });
          } 
     }


     sair() {
          return signOut(this.auth)
     }

     usuarioAtual$ = user(this.auth);
}
