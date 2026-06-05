import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder  } from '@angular/forms';
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

 // Serviços de cadastro
  private auth = inject(AuthService);
  private createUser = inject(UserService);
  private fb = inject(FormBuilder); // ligar o form do HTML ao objeto do TypeScript
  
  // variavel para erros no metodo async
  erroGeral = '';

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


// Criação do objeto do formulário para puxar os dados
 cadastroForm = this.fb.group({
     nome: [''], // representa: valor inicial vazio
     email: [''], 
     senha: ['']
 })

 //* Cadastro via Services
     // Cadastro comum
  async confirmarCadastro() {
      const nome = this.cadastroForm.value.nome ?? ''; // o TS precisa saber que está tudo bem caso vier um "Undefined" nos campos
      const email = this.cadastroForm.value.email ?? ''; //Por isso atribuimos os var do formGroup aqui 
      const senha = this.cadastroForm.value.senha ?? ''; // Não pode ser feito anteriormente se não perderemos os valores colocados

       try {
            const userInfo = await this.auth.cadastrar(email, senha) // armazena a resposta do firebase (uid, senha, email..)
            await this.createUser.criarUserProfile(userInfo.user.uid,{ // chamamos o User Service e colocamos o UID junto com as info do objeto construido acima
               uid: userInfo.user.uid, 
               name: nome,
               email: email,
               profilePic: '',
            });

            this.router.navigate(['/tabs/home']);
       } catch (error: any) { // pode ser qualquer tipo: string, numero...
          this.erroGeral = error.message;
       }
  }

     // Cadastro com Google
     async cadastrarComGoogle() {
          try { // não precisa de NADA (diferente da de cima), pois estamos usando informações diretas do Google
               await this.auth.entrarComGoogle()  // está função toma conta de tudo
               this.router.navigate(['/tabs/home'])
          } catch (error: any) {
               this.erroGeral = error.message;
          }
     }

}
