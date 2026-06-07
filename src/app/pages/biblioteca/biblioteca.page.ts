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
import { firstValueFrom } from 'rxjs';

import { Deck } from '../../interfaces/deck';
import { DeckService } from 'src/app/services/deck.service';
import { ProgressService } from 'src/app/services/progress.service';
import { AuthService } from 'src/app/services/auth.service';

import {
  homeOutline,
  libraryOutline,
  happyOutline,
  searchOutline,
  filterOutline,
  albumsOutline,
  timeOutline,
  informationCircleOutline,
  logoGithub,
  logOutOutline
} from 'ionicons/icons';

// tipo auxiliar que junta o deck com o progresso do usuário
interface DeckComProgresso extends Deck {
  progressoUsuario: number; // valor de 0 a 100
}

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

  decks: DeckComProgresso[] = []; // agora carrega deck + progresso do usuário
  carregando = true;

  private deckService = inject(DeckService);
  private progressService = inject(ProgressService);
  private authService = inject(AuthService);

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
      albumsOutline,
      timeOutline,
      informationCircleOutline,
      logoGithub,
      logOutOutline
    });
  }

  // toda vez que voltamos para esta tela irá carregar novamente
  ionViewWillEnter() {
    this.carregarDeck();
  }

  async carregarDeck() {
    this.carregando = true;
    try {
      // pega o usuário logado
      const usuario = await firstValueFrom(this.authService.usuarioAtual$);

      // busca todos os decks
      const decks = await firstValueFrom(this.deckService.pegarDecks());

      // para cada deck, busca o progresso daquele usuário
      // Promise.all faz todas as buscas ao mesmo tempo (mais rápido!)
      this.decks = await Promise.all(
        decks.map(async (deck) => {
          let progressoUsuario = 0;

          if (usuario) {
            const progresso = await firstValueFrom(
              this.progressService.pegarProgresso(deck.id, usuario.uid)
            );
            progressoUsuario = progresso?.finalResult ?? 0;
          }

          return { ...deck, progressoUsuario };
        })
      );
    } catch (error) {
      console.error('Erro ao carregar decks:', error);
    } finally {
      this.carregando = false;
    }
  }

  abrirSessao(deck: Deck) {
    this.router.navigate(['/sessao'], {
      state: { deckId: deck.id }
    });
  }

  // cores de tags e dos decks
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
    window.open('https://github.com/Paamzzz/recall-mobile', '_blank');
  }

     async logout() {
          try {
               await this.authService.sair()
               this.router.navigate(['/splash']);
          } catch (error: any) {
               console.error('Erro ao desconectar')
          }
     }
}
