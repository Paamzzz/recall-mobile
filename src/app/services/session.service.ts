import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Session } from '../interfaces/session';

@Injectable({ providedIn: 'root' })
export class SessionService {

     private session: Session = { // inicializar o molde do 0
          currentCard: 0,
          allCards: [],
          correctCards: [],
          wrongCards: [],
     };

     iniciarSessao(cards: Card[]) {
          this.resetarSessao();
          this.session.allCards = cards;
     }

     resetarSessao() {
          this.session = {
               currentCard: 0,
               allCards: [],
               correctCards: [],
               wrongCards: [],
          }
     }

     pegarCardAtual() {
          const posicao = this.session.currentCard; //pega o index do card atual
          return this.session.allCards[posicao]; // pega o card que possui o mesmo index pego acima
     }

     responderCard(resposta: 'certo' | 'errado') {
          const cardAtual = this.pegarCardAtual();

          if (resposta === 'certo') {
               this.session.correctCards.push(cardAtual);
          } else if (resposta === 'errado') {
               this.session.wrongCards.push(cardAtual);
          } 
          this.session.currentCard++ // para mudar o card e prosseguir para o próximo
     }

     avancarCard() {
          this.session.currentCard++;
     }

     voltarCard() {
          this.session.currentCard--;
     }

     calcularProgresso() {
          const progressoAtual = this.session.correctCards.length / this.session.allCards.length * 100;
          return progressoAtual
     }

     finalizarSessao() {
    // Descobre os cards que não foram respondidos
    const cardsPulados = this.session.allCards.filter(card => 
        !this.session.correctCards.some(c => c.id === card.id) &&
        !this.session.wrongCards.some(c => c.id === card.id)
    );

    const allCards = this.session.allCards.length;
    const correctCards = this.session.correctCards;
    const wrongCards = [...this.session.wrongCards, ...cardsPulados]; // junta errados + pulados
    const progresso = this.calcularProgresso();

    this.resetarSessao();

    return { allCards, correctCards, wrongCards, progresso };
}
}
