import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline, arrowForwardOutline,
  checkmarkOutline, closeOutline, happyOutline
} from 'ionicons/icons';

// Transformar retornos em Promises
import { firstValueFrom  } from 'rxjs';

//Importando serviços e interface Card
import { SessionService } from 'src/app/services/session.service';
import { ProgressService } from 'src/app/services/progress.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/interfaces/card';
@Component({
  selector: 'app-sessao',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage {

  deckId: string = '';
  cards: Card[] = [];
  isFlipped = false;
  carregando = true; 

  private router = inject(Router);
  private cardService = inject(CardService);
  private progressService = inject(ProgressService);
  private sessionService = inject(SessionService);

  constructor() {
    addIcons({
      arrowBackOutline, arrowForwardOutline,
      checkmarkOutline, closeOutline, happyOutline
    });

    // getCurrentNavigation() pega os dados que vieram no navigate()
    // só funciona dentro do constructor, por isso está aqui
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state?.['deckId']) {
      this.deckId = state['deckId'];
      console.log('Deck recebido:', this.deckId); // para confirmar que chegou
    }
  }

 async mostrarCard() {
     this.carregando = true;
     try {
          this.cards = await firstValueFrom(this.cardService.pegarCardsPeloDeck(this.deckId));
          this.carregando = false;
     } catch (error: any) {
          console.error('Erro ao carregar decks:', error);
          this.carregando = false;
     }
}

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
