import { Injectable, inject } from '@angular/core';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card'

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private firestore = inject(Firestore);

  pegarCardsPeloDeck(deckId: string): Observable<Card[]> {
    const cards = collection(this.firestore, 'cards');  // aponta para a coleção 'cards' no Firestore
    const consultaFiltrada = query(cards, where('deckId', '==', deckId)); // filtra só os cards onde deckId são iguais
    return collectionData(consultaFiltrada, { idField: 'id' }) as Observable<Card[]>; // salva o id em um campo novo porque na interface eu coloquei o "id"
  }
}
