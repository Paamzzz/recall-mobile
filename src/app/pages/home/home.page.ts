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
     IonToolbar
} from '@ionic/angular/standalone';

import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { addIcons } from 'ionicons';

import {
     homeOutline,
     libraryOutline,
     happyOutline,
     sparkles,
     albumsOutline,
     timeOutline
} from 'ionicons/icons';

import {
     GroqService
} from '../../services/groq.service'

@Component({
     selector: 'app-home',
     templateUrl: 'home.page.html',
     styleUrls: ['home.page.scss'],
     standalone: true,
     imports: [
          IonLabel,
          IonIcon,
          IonTabButton,
          IonFooter,
          IonTabBar,
          IonToolbar,
          IonContent,
          IonButton,
          RouterLink,
          NgIf
     ],
})
export class HomePage {
     dica: string = 'carregando dica...';
     carregando: boolean = true;

     // Services
     private authService = inject(AuthService);
     private router = inject(Router);
     private groqService = inject(GroqService)

     constructor() {
          addIcons({
               homeOutline,
               libraryOutline,
               happyOutline,
               sparkles,
               albumsOutline,
               timeOutline
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

}
