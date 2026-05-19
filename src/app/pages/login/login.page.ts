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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {

  mostrarSenha = false;

  constructor(private router: Router) {

    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });

  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  entrar() {

    // futuramente validar login

    this.router.navigate(['/home']);
  }

  loginComGoogle() {
    alert('Login com Google');
  }

}
