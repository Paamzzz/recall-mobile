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
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  libraryOutline,
  happyOutline,
  searchOutline,
  filterOutline,
  documentTextOutline,
  timeOutline
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
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class BibliotecaPage {

  constructor() {

    addIcons({
      homeOutline,
      libraryOutline,
      happyOutline,
      searchOutline,
      filterOutline,
      documentTextOutline,
      timeOutline
    });

  }

}
