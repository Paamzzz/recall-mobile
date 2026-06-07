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
 
import {
  Haptics,
  ImpactStyle,
  NotificationType
} from '@capacitor/haptics';


import { ProgressService } from 'src/app/services/progress.service';
import { GroqService } from 'src/app/services/groq.service';
import { AuthService } from 'src/app/services/auth.service';
import { DeckService } from 'src/app/services/deck.service';
import { Progress } from 'src/app/interfaces/progress';
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
 
 // Vibrações e sons    
async vibrar() {
    await Haptics.notification({
      type: NotificationType.Success
    });
  }

  sucessAudio = new Audio('assets/audio/sucess.wav');
  
    tocarSucess() {
      this.sucessAudio.currentTime = 0;
      this.sucessAudio.play();
    }


  // dados exibidos na tela
  deckId: string = '';
  percentual: number = 0;
  totalAcertos: number = 0;
  totalErros: number = 0;
  totalPerguntas: number = 0;
  titulo: string = '';
  subtitulo: string = '';
 
  // feedback da IA
  feedbackPositivo: string = '';
  feedbackNegativo: string = '';
  carregandoFeedback: boolean = true;
 
  private router = inject(Router);
  private progressService = inject(ProgressService);
  private authService = inject(AuthService);
  private groqService = inject(GroqService);
  private deckService = inject(DeckService);
 
  constructor() {
    addIcons({ starOutline, checkmark, alertCircle, sparkles });
  }
 
  async ngOnInit(): Promise<void> {
    // pega os dados que a SessaoPage enviou via router state
    const state = history.state;
    const resultado = state?.resultado;
    this.deckId = state?.deckId ?? '';
     
     // Adiciona sons e Vibrações
     this.tocarSucess();
     this.vibrar();

    if (!resultado) return; // segurança: se não tiver resultado, para tudo
 
    // pega os arrays de cards certos e errados
    const correctCards: Card[] = resultado.correctCards ?? [];
    const wrongCards: Card[] = resultado.wrongCards ?? [];
 
    // preenche os números que aparecem na tela
    this.totalAcertos = correctCards.length;
    this.totalErros = wrongCards.length;
    this.totalPerguntas = resultado.allCards ?? 0;
    this.percentual = Math.round(resultado.progresso ?? 0);
 
    // define título e subtítulo baseado na porcentagem
    if (this.percentual >= 80) {
      this.titulo = 'Arrasou! 🎉';
      this.subtitulo = 'Você está pronto para a entrevista.';
    } else if (this.percentual >= 50) {
      this.titulo = 'Quase lá!';
      this.subtitulo = 'Mais um pouco e você chega lá.';
    } else {
      this.titulo = 'Não desista!';
      this.subtitulo = 'Revise os pontos fracos e tente de novo.';
    }
 
    // busca as informações do deck para passar ao Groq
    const decks = await firstValueFrom(this.deckService.pegarDecks());
    const deckAtual = decks.find(d => d.id === this.deckId) ?? null;
 
    // pega o usuário logado e salva o progresso no Firestore
    const usuario = await firstValueFrom(this.authService.usuarioAtual$);
    if (usuario) {
      const progress: Progress = {
        deckId: this.deckId,
        finalResult: this.percentual
      };
      await this.progressService.salvarProgresso(this.deckId, usuario.uid, progress);
    }
 
    // chama a Groq para os dois feedbacks ao mesmo tempo (Promise.all = mais rápido!)
    try {
      const [feedbackBom, feedbackMelhorar] = await Promise.all([
        this.groqService.gerarFeedbackPositivo(
          correctCards.map(c => c.question),
          deckAtual?.name ?? '',
          deckAtual?.description ?? '',
          deckAtual?.seniority ?? ''
        ),
        this.groqService.gerarFeedbackMelhorar(
          wrongCards.map(c => c.question),
          deckAtual?.name ?? '',
          deckAtual?.description ?? '',
          deckAtual?.seniority ?? ''
        )
      ]);
 
      this.feedbackPositivo = feedbackBom;
      this.feedbackNegativo = feedbackMelhorar;
    } catch (error) {
      // se a Groq falhar, mostra mensagem padrão
      this.feedbackPositivo = 'Não foi possível gerar o feedback agora.';
      this.feedbackNegativo = 'Não foi possível gerar o feedback agora.';
    } finally {
      // carregando termina independente de sucesso ou erro
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
