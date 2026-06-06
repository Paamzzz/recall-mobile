import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  pegarCardsPeloDeck(deckId: string): Observable<Card[]> {
  console.log('Buscando cards com deckId:', deckId); // ← confirma o valor
  return new Observable(subscriber => {
    runInInjectionContext(this.injector, () => {
     const cards = collection(this.firestore, `decks/${deckId}/cards`);
     const consultaFiltrada = query(cards);
      const obs = collectionData(consultaFiltrada, { idField: 'id' }) as Observable<Card[]>;
      obs.subscribe({
        next: (data) => {
          console.log('Resultado bruto do Firestore:', data); // ← confirma o retorno
          subscriber.next(data);
        },
        error: (err) => {
          console.error('Erro na query de cards:', err); // ← captura erro de permissão
          subscriber.error(err);
        }
      });
    });
  });
}
}
