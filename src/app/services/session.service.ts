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
          skippedCards: []
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
               skippedCards: []
          }
     }

     pegarCardAtual() {
          const posicao = this.session.currentCard; //pega o index do card atual
          return this.session.allCards[posicao]; // pega o card que possui o mesmo index pego acima
     }

     responderCard(resposta: 'certo' | 'errado' | 'pulado') {
          const cardAtual = this.pegarCardAtual();

          if (resposta === 'certo') {
               this.session.correctCards.push(cardAtual);
          } else if (resposta === 'errado') {
               this.session.wrongCards.push(cardAtual);
          } else {
               this.session.skippedCards.push(cardAtual)
          }

          this.session.currentCard++ // para mudar o card e prosseguir para o próximo
     }

     calcularProgresso() {
         const progressoAtual = this.session.correctCards.length / this.session.allCards.length * 100;
         return progressoAtual
     }

     finalizarSessao () {
          // precisa ser salvo em var, se não a função apaga antes de retornar
          const allCards = this.session.allCards.length;
          const correctCards = this.session.correctCards;
          const wrongCards = this.session.wrongCards;
          const progresso = this.calcularProgresso();

          this.resetarSessao();

          return { // Está se referenciando as variaveis criadas NESTA função
               allCards,
               correctCards,
               wrongCards,
               progresso
          } 
     }
}
