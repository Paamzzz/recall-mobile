import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { doc, docData, setDoc, Firestore } from '@angular/fire/firestore'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);

  pegarUserProfile(uid: string): Observable<User> {
     const docUser = doc(this.firestore, 'users', uid);
     return docData(docUser) as Observable<User>;
  }
  
  // salva os dados no firestore, enquanto o AuthService só cria a conta
  // Promise<void> apenas executa sem esperar um retorno
  criarUserProfile(uid: string, data: User): Promise<void> { 
     const docUser = doc(this.firestore, 'users', uid);
     return setDoc(docUser, data); //adiciona os dados 
  }
}
