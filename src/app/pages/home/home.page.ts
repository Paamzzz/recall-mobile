import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonLabel,
  IonItem,
  IonList,
  IonMenu,
} from '@ionic/angular/standalone';

import { MenuController } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  libraryOutline,
  happyOutline,
  sparkles,
  albumsOutline,
  timeOutline,
  informationCircleOutline,
  logoGithub
} from 'ionicons/icons';

import { firstValueFrom } from 'rxjs';

import { GroqService } from '../../services/groq.service';
import { DeckService } from '../../services/deck.service';
import { UserService } from '../../services/user.service';
import { ProgressService } from '../../services/progress.service';
import { Deck } from 'src/app/interfaces/deck';

// tipo auxiliar que junta o deck com o progresso do usuário
interface DeckComProgresso extends Deck {
  progressoUsuario: number; // valor de 0 a 100
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonContent,
    IonIcon,
    IonLabel,
    IonMenu,
    NgIf,
    RouterLink
  ]
})
export class HomePage implements OnInit {
  dica: string = 'Carregando dica...';
  deckAleatorio: DeckComProgresso | null = null; // agora inclui o progresso do usuário
  carregandoDeck: boolean = true;
  carregandoDica: boolean = true;
  nomeUsuario = '';

  private router = inject(Router);
  private authService = inject(AuthService);
  private groqService = inject(GroqService);
  private userService = inject(UserService);
  private deckService = inject(DeckService);
  private progressService = inject(ProgressService);
  private menuCtrl = inject(MenuController);

  constructor() {
    addIcons({
      homeOutline,
      libraryOutline,
      happyOutline,
      sparkles,
      albumsOutline,
      timeOutline,
      informationCircleOutline,
      logoGithub
    });
  }

  ngOnInit() {
    this.gerarDicaEntrevista();
  }

  async ionViewWillEnter() {
    // pega o usuário logado uma vez e usa em tudo
    const usuario = await firstValueFrom(this.authService.usuarioAtual$);

    // busca nome do usuário
    if (usuario) {
      const perfil = await firstValueFrom(this.userService.pegarUserProfile(usuario.uid));
      this.nomeUsuario = perfil.name;
    }

    // busca deck aleatório + progresso do usuário naquele deck
    await this.pegarRandomDeck(usuario?.uid ?? null);
  }

  async pegarRandomDeck(uid: string | null): Promise<void> {
    try {
      this.carregandoDeck = true;

      // busca o deck aleatório
      const deck = await this.deckService.pegarRandomDeck();

      // busca o progresso do usuário nesse deck específico
      let progressoUsuario = 0;
      if (uid) {
        const progresso = await firstValueFrom(
          this.progressService.pegarProgresso(deck.id, uid)
        );
        progressoUsuario = progresso?.finalResult ?? 0;
      }

      this.deckAleatorio = { ...deck, progressoUsuario };
    } catch (error) {
      console.error('Erro ao carregar deck:', error);
    } finally {
      this.carregandoDeck = false;
    }
  }

  async gerarDicaEntrevista() {
    try {
      this.carregandoDica = true;
      this.dica = await this.groqService.gerarDicaEntrevista();
    } catch (error) {
      console.error('Erro ao carregar dica:', error);
      this.dica = 'Não foi possível carregar a dica. Tente novamente.';
    } finally {
      this.carregandoDica = false;
    }
  }

  async logout() {
    await this.authService.sair();
    this.router.navigate(['/splash']);
  }

  async openMenu() {
    await this.menuCtrl.open('home-menu');
  }

  openGithub() {
    window.open('https://github.com', '_blank');
  }
}
