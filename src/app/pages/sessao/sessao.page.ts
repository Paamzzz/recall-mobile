import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  arrowForwardOutline,
  checkmarkOutline,
  closeOutline,
  happyOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-sessao',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './sessao.page.html',
  styleUrls: ['./sessao.page.scss'],
})
export class SessaoPage {

  isFlipped = false;

  constructor() {
    addIcons({
      arrowBackOutline,
      arrowForwardOutline,
      checkmarkOutline,
      closeOutline,
      happyOutline
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

}
