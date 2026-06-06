import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonIcon,
  IonLabel,
  IonMenu,
  IonList,
  IonItem,
  MenuController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

// Import de services
import { Deck } from '../../interfaces/deck';
import { DeckService } from 'src/app/services/deck.service';

import {
  homeOutline,
  libraryOutline,
  happyOutline,
  searchOutline,
  filterOutline,
  documentTextOutline,
  timeOutline,
  informationCircleOutline,
  logoGithub,
  logOutOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonLabel,
    IonMenu,
    IonList,
    IonItem,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class BibliotecaPage {

  // objetos que utilizarei nos serviços
  decks: Deck[] = [];
  carregando = true;

  // serviços na qual vou utilizar
  private deckService = inject(DeckService);
     
  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) {

    addIcons({
      homeOutline,
      libraryOutline,
      happyOutline,
      searchOutline,
      filterOutline,
      documentTextOutline,
      timeOutline,
      informationCircleOutline,
      logoGithub,
      logOutOutline
    });

  }
 
  // Toda vez que voltamos para esta tela irá carregar novamente
  ionViewWillEnter() {
     this.carregarDeck()
  }
//? por que não usa async?
   carregarDeck() {
     this.carregando = true;

     //? o que é subscribe()? 
     this.deckService.pegarDecks().subscribe({
          next: (decks) => {
               this.decks = decks;
               this.carregando = false;
          }, error: (error) => {
               console.error('Erro ao carregar decks:', error);
               this.carregando = false;
          }
     });
  }

  
  abrirSessao(deck: Deck) {
       this.router.navigate(['/sessao'], { // usar 'navigate()' faz com que não fique na url:'localhost/sessao/123644'
          state: { deckId: deck.id } // precisamos manter na navegação o id
     });
}
// Cores de tags e dos decks
corDoCard(tipo: string): string {
  return tipo === 'tecnico' ? 'purple' : 'orange';
}

corDaSenioridade(seniority: string): string {
  const cores: Record<string, string> = {
    junior: 'cyan',
    pleno: 'blue',
    senior: 'purple-status'
  };
  return cores[seniority] ?? 'blue';
}

  async openMenu() {
    await this.menuCtrl.open('main-menu');
  }

  openGithub() {
    window.open(
      'https://github.com/Paamzzz/recall-mobile',
      '_blank'
    );
  }

  logout() {
    // limpa login
    localStorage.clear();

    // redireciona para login
    this.router.navigate(['/login']);
  }

}
