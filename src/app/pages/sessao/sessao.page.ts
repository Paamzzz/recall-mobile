import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline, arrowForwardOutline,
  checkmarkOutline, closeOutline, happyOutline
} from 'ionicons/icons';

import { firstValueFrom } from 'rxjs';

import { SessionService } from 'src/app/services/session.service';
import { ProgressService } from 'src/app/services/progress.service';
import { CardService } from 'src/app/services/card.service';
import { DeckService } from 'src/app/services/deck.service';
import { Card } from 'src/app/interfaces/card';
import { Deck } from 'src/app/interfaces/deck';

import {
  Haptics,
  ImpactStyle,
  NotificationType
} from '@capacitor/haptics';

@Component({
  selector: 'app-sessao',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage {

// Sons e efeitos sonoros
  async vibrar() {
    await Haptics.impact({
      style: ImpactStyle.Light
    });
  }

  answerAudio = new Audio('assets/audio/answer.wav');
  clickAudio = new Audio('assets/audio/click.wav');
  
    tocarAnswer() {
      this.answerAudio.currentTime = 0;
      this.answerAudio.play();
    }
    tocarClick() {
     this.clickAudio.currentTime = 0;
     this.clickAudio.play()
    }

 // Para os serviços e conexões 
  deckId: string = '';
  deckAtual: Deck | null = null;       // informações do deck (nome, descrição)
  progressoAtual: number | null = null;
  resultadoFinal: any = null;
  cardAtual: Card | null = null;       // card sendo exibido no momento
  cards: Card[] = [];                  // todos os cards do deck
  isFlipped = false;                   // controla se o card está virado
  carregando = true;

  private router = inject(Router);
  private route = inject(ActivatedRoute); 
  private cardService = inject(CardService);
  private deckService = inject(DeckService);
  private progressService = inject(ProgressService);
  private sessionService = inject(SessionService);

  constructor() {
    addIcons({
      arrowBackOutline, arrowForwardOutline,
      checkmarkOutline, closeOutline, happyOutline
    });
  }

  ngOnInit() {
    const state = history.state; // salva no browser e persis
    if (state?.deckId) {
      this.deckId = state.deckId;
      console.log('Deck recebido:', this.deckId);
    }

    this.carregarCards();
  }

  // Busca os cards e o deck, inicializa a sessão
  async carregarCards() {
    this.carregando = true;
    try {
        this.cards = await firstValueFrom(this.cardService.pegarCardsPeloDeck(this.deckId));
        const decks = await firstValueFrom(this.deckService.pegarDecks());
        this.deckAtual = decks.find(d => d.id === this.deckId) ?? null;

        this.sessionService.iniciarSessao(this.cards);
        this.cardAtual = this.sessionService.pegarCardAtual();
        this.carregando = false;

    } catch (error: any) {
        console.error('Erro ao carregar sessão:', error);
        this.carregando = false;
    }
}

  // getter para exibir a posição atual no contador (começa em 1, não 0)
  get indiceAtual(): number {
    return this.sessionService.pegarIndiceAtual();
  }

  // registra a resposta, atualiza progresso e avança para o próximo card
  async respostaCard(resposta: 'certo' | 'errado') {
    this.sessionService.responderCard(resposta);
    this.carregarProgresso();
    this.cardAtual = this.sessionService.pegarCardAtual();
    this.isFlipped = false;
    this.tocarClick()
  }

  // atualiza a barra de progresso com o valor do service
  carregarProgresso() {
    this.progressoAtual = this.sessionService.calcularProgresso();
  }

  // finaliza a sessão e navega para a tela de resultado com os dados
  encerrarSessao() {
    this.resultadoFinal = this.sessionService.finalizarSessao();
    this.router.navigate(['/resultado'], {
      state: { resultado: this.resultadoFinal }
    });
  }

  // avança para o próximo card sem registrar resposta
  proximoCard() {
    this.sessionService.avancarCard();
    this.cardAtual = this.sessionService.pegarCardAtual();
    this.isFlipped = false;
    this.tocarAnswer();
  }

  // volta para o card anterior
  anteriorCard() {
    this.sessionService.voltarCard();
    this.cardAtual = this.sessionService.pegarCardAtual();
    this.isFlipped = false;
    this.tocarAnswer();
  }

  // vira o card para mostrar frente ou verso
  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.tocarAnswer()
    this.vibrar()
  }
}
