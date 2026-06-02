import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonFooter,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonMenu,
  IonList,
  IonItem,
  IonMenuButton,
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
  logoGithub
} from 'ionicons/icons';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonFooter,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonMenu,
    IonList,
    IonItem,
    IonMenuButton,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class BibliotecaPage {

  constructor(
    private menuCtrl: MenuController
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
      logoGithub
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

}
