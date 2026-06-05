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

import { Observable, firstValueFrom  } from 'rxjs';

//* Todos os serviços 
import { GroqService } from '../../services/groq.service';
import { DeckService } from '../../services/deck.service';
import { UserService } from '../../services/user.service';
import { Deck } from 'src/app/interfaces/deck';

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
  deckAleatorio: Deck | null = null; //O | null significa "pode ser um Deck ou pode ser nulo". Isso é chamado de union type.
  carregandoDeck: boolean = true;
  carregandoDica: boolean = true;
  nomeUsuario = 'Amanda'; // temporário

  // Services
  private router = inject(Router);
  private authService = inject(AuthService);
  private groqService = inject(GroqService);
  private userService = inject(UserService);
  private deckService = inject(DeckService);
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
         await this.pegarRandomDeck();
         
          // 1. pega o usuário logado
          const usuario = await firstValueFrom(this.authService.usuarioAtual$);

          // 2. se existir, usa o uid para buscar o perfil
          if (usuario) {
               const perfil = await firstValueFrom(this.userService.pegarUserProfile(usuario.uid));
               this.nomeUsuario = perfil.name;
          }
     }

  // Gerar deck deckAleatorio
  async pegarRandomDeck(): Promise<void> {
     try {
          this.carregandoDeck = true;
          this.deckAleatorio = await this.deckService.pegarRandomDeck();
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
