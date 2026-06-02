import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Deck } from '../interfaces/deck'

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private firestore = inject(Firestore);

  pegarDecks(): Observable<Deck[]>{
     const decks = collection(this.firestore, 'decks' );
     return collectionData(decks, { idField:'id' }) as Observable<Deck[]>;
     // É necessário colocarmos o "idField" pois o firestore não traz ele automaticamente
     // Então ao fazer um collectionData(), traria tudo (nome, tipo...) menos id
  }

  
}
