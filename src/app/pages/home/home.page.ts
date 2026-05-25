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
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  MenuController
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
  timeOutline,
  informationCircleOutline,
  logoGithub,
  searchOutline,
  filterOutline
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
    IonMenu,
    IonList,
    IonItem,
    RouterLink
  ],
})
export class HomePage {

  // Services
  private authService = inject(AuthService);
  private router = inject(Router);
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
      logoGithub,
      searchOutline,
      filterOutline
    });

  }

  async logout() {

    await this.authService.sair();
    this.router.navigate(['/splash']);

  }

  openMenu() {
    this.menuCtrl.open('home-menu');
  }

  openGithub() {
    window.open('https://github.com/', '_blank');
  }

}
