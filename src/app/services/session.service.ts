import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card';
import { Session } from '../interfaces/session';

@Injectable({ providedIn: 'root' })
export class SessionService {

  private session: Session = {
    currentCard: 0,
    allCards: [],
    correctCards: [],
    wrongCards: [],
  };

  // Map que guarda a resposta mais recente de cada card: id -> 'certo' | 'errado'
  private respostas: Map<string, 'certo' | 'errado'> = new Map();

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
    };
    this.respostas = new Map();
  }

  pegarCardAtual() {
    return this.session.allCards[this.session.currentCard];
  }

  responderCard(resposta: 'certo' | 'errado') {
    const cardAtual = this.pegarCardAtual();
    this.respostas.set(cardAtual.id, resposta); // sobrescreve se já existia
    this.avancarCard();
  }

  avancarCard() {
    if (this.session.currentCard < this.session.allCards.length - 1) {
      this.session.currentCard++;
    }
  }

  voltarCard() {
    if (this.session.currentCard > 0) {
      this.session.currentCard--;
    }
  }

  calcularProgresso() {
    // conta só os que foram respondidos como certo
    let acertos = 0;
    this.respostas.forEach(resposta => {
      if (resposta === 'certo') acertos++;
    });
    return (acertos / this.session.allCards.length) * 100;
  }

  pegarIndiceAtual() {
    return this.session.currentCard + 1;
  }

  finalizarSessao() {
    const correctCards: Card[] = [];
    const wrongCards: Card[] = [];

    this.session.allCards.forEach(card => {
      const resposta = this.respostas.get(card.id);
      if (resposta === 'certo') {
        correctCards.push(card);
      } else {
        wrongCards.push(card); // errado ou não respondido
      }
    });

    const allCards = this.session.allCards.length;
    const progresso = this.calcularProgresso();

    this.resetarSessao();

    return { allCards, correctCards, wrongCards, progresso };
  }
}
