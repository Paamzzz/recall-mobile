import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonLabel,
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

import { GroqService } from '../../services/groq.service';

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
  carregando: boolean = true;

  // Services
  private authService = inject(AuthService);
  private router = inject(Router);
  private groqService = inject(GroqService);
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
