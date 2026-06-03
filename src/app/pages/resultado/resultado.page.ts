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

  titulo = 'Sessão concluída!';
  subtitulo = 'Entrevista Frontend';

  acertos = 8;
  totalPerguntas = 10;

  percentual = 80;

  pontosFortes =
    'Conceitos de hooks e ciclo de vida do React. Suas respostas mostraram boa base prática.';

  pontosMelhoria =
    'Aprofunde em performance e memoização. Tópicos como useMemo e useCallback costumam aparecer em entrevistas sênior.';

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
    if (this.totalPerguntas > 0) {
      this.percentual = Math.round(
        (this.acertos / this.totalPerguntas) * 100
      );
    }
  }

  repetirDeck(): void {
    console.log('Repetir deck');
  }

  voltarBiblioteca(): void {
    this.router.navigate(['/biblioteca']);
  }
}
