import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonButton,
  IonInput,
  IonIcon
} from '@ionic/angular/standalone';

import { RouterModule, Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonButton,
    IonInput,
    IonIcon
  ]
})
export class CadastroPage {

  mostrarSenha = false;
  mostrarRepetirSenha = false;

  constructor(private router: Router) {

    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });

  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleRepetirSenha() {
    this.mostrarRepetirSenha = !this.mostrarRepetirSenha;
  }

  confirmarCadastro() {

    // futuramente aqui vai salvar no banco

    this.router.navigate(['/login']);
  }

  loginComGoogle() {
    alert('Login com Google');
  }

}
