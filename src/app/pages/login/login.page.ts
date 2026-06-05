import { Component, inject } from '@angular/core';
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

import { AuthService } from '../../services/auth.service';

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

  email = '';
  senha = '';

  private authService = inject(AuthService);

  constructor(private router: Router) {

    addIcons({
      'eye-outline': eyeOutline,
      'eye-off-outline': eyeOffOutline
    });

  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  async entrar() {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Chama a função entrar do auth.service.ts
      await this.authService.entrar(this.email, this.senha);
      console.log('Login efetuado com sucesso!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('E-mail ou senha incorretos. Tente novamente!');
    }
  }

  async loginComGoogle() {
    try {
      await this.authService.entrarComGoogle();
      this.router.navigate(['/home']);

    } catch (error) {
      console.error('Erro no login com Google:', error);
      alert('Erro ao tentar entrar com o Google.');

    }
  }
}
