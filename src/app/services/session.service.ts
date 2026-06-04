import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Session } from '../interfaces/session';

@Injectable({ providedIn: 'root' })
export class SessionService {

     private session: Session = {
          currentCard: 0,
          totalCards: 0,
          correctCards: [],
          wrongCards: [],
          skippedCards: []
     };

     iniciarSessao(cards: Card[]) {
          this.resetarSessao();
          this.session.currentCard = 0;
          this.session.totalCards = cards.length;
     }

     resetarSessao() {
          this.session = {
               currentCard: 0,
               totalCards: 0,
               correctCards: [],
               wrongCards: [],
               skippedCards: []
          }
     }

     pegarCardAtual() {
          
     }

}
