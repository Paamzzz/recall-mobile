import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { firstValueFrom } from 'rxjs';

import {
  starOutline,
  checkmark,
  alertCircle,
  sparkles
} from 'ionicons/icons';

import { Router } from '@angular/router';

import { ProgressService } from 'src/app/services/progress.service';
import { GroqService } from 'src/app/services/groq.service';
import { AuthService } from 'src/app/services/auth.service';
import { Progress } from 'src/app/interfaces/progress';
import { DeckService } from 'src/app/services/deck.service';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonButton
  ]
})
export class ResultadoPage implements OnInit {

  // dados da sessão recebidos via state
  deckId: string = '';
  percentual: number = 0;
  totalAcertos: number = 0;
  totalErros: number = 0;

  // feedback da IA
  feedbackPositivo: string = '';
  feedbackNegativo: string = '';
  carregandoFeedback: boolean = true;

  private router = inject(Router);
  private progressService = inject(ProgressService);
  private authService = inject(AuthService);
  private groqService = inject(GroqService);
  private deckService = inject(DeckService)

  constructor() {
    addIcons({ starOutline, checkmark, alertCircle, sparkles });
  }

  async ngOnInit(): Promise<void> {
    // pega os dados que a SessaoPage enviou
    const state = history.state;
    const resultado = state?.resultado;
    this.deckId = state?.deckId ?? '';

    if (!resultado) return; // segurança: se não tiver resultado, para tudo

    // pega os arrays de cards certos e errados
    const correctCards: Card[] = resultado.correctCards ?? [];
    const wrongCards: Card[] = resultado.wrongCards ?? [];

    // preenche os números que aparecem na tela
    this.totalAcertos = correctCards.length;
    this.totalErros = wrongCards.length;
    this.percentual = resultado.progresso ?? 0;

    // pega o usuário logado e salva o progresso no Firestore
    const usuario = await firstValueFrom(this.authService.usuarioAtual$);
    if (usuario) {
      const progress: Progress = {
        deckId: this.deckId,
        finalResult: this.percentual
      };
      await this.progressService.salvarProgresso(this.deckId, usuario.uid, progress);
    }

    // chama a Groq para gerar os dois feedbacks em paralelo
    // Promise.all espera os dois terminarem ao mesmo tempo (mais rápido!)
    try {
      const [feedbackBom, feedbackMelhorar] = await Promise.all([
        this.groqService.gerarFeedbackPositivo(
          correctCards.map(c => c.question),
          this.deckId,
          '',
          ''
        ),
        this.groqService.gerarFeedbackMelhorar(
          wrongCards.map(c => c.question),
          this.deckId,
          '',
          ''
        )
      ]);

      this.feedbackPositivo = feedbackBom;
      this.feedbackNegativo = feedbackMelhorar;
    } catch (error) {
      // se a Groq falhar, mostra uma mensagem padrão
      this.feedbackPositivo = 'Não foi possível gerar o feedback agora.';
      this.feedbackNegativo = 'Não foi possível gerar o feedback agora.';
    } finally {
      this.carregandoFeedback = false;
    }
  }

  repetirDeck(): void {
    this.router.navigate(['/sessao'], {
      state: { deckId: this.deckId }
    });
  }

  voltarBiblioteca(): void {
    this.router.navigate(['/tabs/trilha']);
  }
}
