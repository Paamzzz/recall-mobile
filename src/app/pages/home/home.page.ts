import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonTabBar,
  IonFooter,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonToolbar,
  IonItem,
  IonList,
  IonMenu
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

//* Todos os serviços 
import { GroqService } from '../../services/groq.service';
import { DeckService } from '../../services/deck.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonContent,
    IonTabBar,
    IonFooter,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonToolbar,
    IonMenu,
    NgIf,
    RouterLink
  ]
})
export class HomePage implements OnInit {
  dica: string = 'Carregando dica...';
  carregando: boolean = true;

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

  async gerarDicaEntrevista() {
    try {
      this.carregando = true;
      this.dica = await this.groqService.gerarDicaEntrevista();
    } catch (error) {
      console.error('Erro ao carregar dica:', error);
      this.dica = 'Não foi possível carregar a dica. Tente novamente.';
    } finally {
      this.carregando = false;
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
