import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonLabel,
    IonIcon,
    IonTabButton,
    IonFooter,
    IonTabBar,
    IonToolbar,
    IonContent,
    IonButton,
    RouterLink
  ],
})
export class HomePage {

  // Services
  private authService = inject(AuthService);
  private router = inject(Router);

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

  async logout() {

    await this.authService.sair();
    this.router.navigate(['/splash']);

  }

}
