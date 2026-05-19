import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  libraryOutline,
  sparkles,
  happy
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {

  constructor() {
    addIcons({
      homeOutline,
      libraryOutline,
      sparkles,
      happy
    });
  }

}
