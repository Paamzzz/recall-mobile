import { Injectable, inject } from '@angular/core';
import { doc, setDoc,docData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Progress } from '../interfaces/progress';
@Injectable({
     providedIn: 'root',
})
export class ProgressService {
     private firestore = inject(Firestore);

     pegarProgresso(deckId: string, uid: string): Observable<Progress | undefined> {
           const docProgresso = doc(this.firestore, 'users', uid, 'progress', deckId)
          return docData(docProgresso) as Observable<Progress | undefined>;
     }

    async salvarProgresso(deckId: string, uid: string, deckInfo: Progress): Promise<void> {
          const docProgresso = doc(this.firestore, 'users', uid, 'progress', deckId); 
          await setDoc(docProgresso, deckInfo, {merge: false});
          // o merge:false é porque o firestore tem a tendencia de mesclar os dados,
          // fazendo que caso o objeto nao tenha algum campo, ele vai manter o valor antigo
          // por isso não permitimos, assim, ele substitui totalmente
     }
}
