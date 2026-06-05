import { Component } from '@angular/core';
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
