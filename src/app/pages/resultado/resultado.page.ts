import { Component, OnInit } from '@angular/core';

import {
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  starOutline,
  checkmark,
  alertCircle,
  sparkles
} from 'ionicons/icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton
  ]
})
export class ResultadoPage implements OnInit {

  

  constructor(
    private router: Router
  ) {
    addIcons({
      starOutline,
      checkmark,
      alertCircle,
      sparkles
    });
  }

  ngOnInit(): void {
    this.calcularPercentual();
  }

  calcularPercentual(): void {
    
      
    }
  

  repetirDeck(): void {
    console.log('Repetir deck');
  }

  voltarBiblioteca(): void {
    this.router.navigate(['/biblioteca']);
  }
}
