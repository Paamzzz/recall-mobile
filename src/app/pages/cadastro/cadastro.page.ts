import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
    ReactiveFormsModule,
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

  private auth = inject(AuthService);
  private createUser = inject(UserService);

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


 // Cadastro via Services
  async confirmarCadastro(email, senha) {
     try {
          cadastrar()
     } catch(error) {

     }

    this.router.navigate(['/tabs/home']);
  }

  loginComGoogle() {
    alert('Login com Google');
  }

}
