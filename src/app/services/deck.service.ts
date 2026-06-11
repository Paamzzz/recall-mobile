import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Deck } from '../interfaces/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  pegarDecks(): Observable<Deck[]> {
    return new Observable(subscriber => {
      runInInjectionContext(this.injector, () => {
        const decks = collection(this.firestore, 'decks');
        const obs = collectionData(decks, { idField: 'id' }) as Observable<Deck[]>;
        obs.subscribe(subscriber);
      });
    });
  }

  async pegarRandomDeck(): Promise<Deck> {
    const decks = await firstValueFrom(this.pegarDecks());
    const indice = Math.floor(Math.random() * decks.length);
    return decks[indice];
  }
}
