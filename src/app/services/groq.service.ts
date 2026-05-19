import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class GroqService {
     private readonly baseUrl = 'https://api.groq.com/openai/v1/chat/completions'; //endereço api

     // Método auxiliar para chamar a API (evita repetição de código)
     // ? Antes estava sendo utilizado método GET por conta do Pollinations
     // ? Com a troca de API, foi aperfeiçoado e trocado para o POST
     // ? Tornando o projeto mais profissional e seguro
     private async chamarIA(prompt: string): Promise<string> {
          const response = await fetch(this.baseUrl, { // para enviar a resposta
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${environment.groqApiKey}` // Bearer Token: forma padrão de autenticação em APIs REST
               },
               
               body: JSON.stringify({
                    model: environment.groqModel, // vem do 'enviroment'
                    messages: [
                         { role: 'user', content: prompt }
                    ],
                    temperature: 0.7, // o quão criativo ou preciso a resposta será
                    max_tokens: 1024
               })
          });

          if (!response.ok) {
               throw new Error(`Erro na API Groq: ${response.status}`);
          }
          const data = await response.json();
          return data.choices[0].message.content;
     }

     // Criar lógica no LocalStorage para evitar repetições de dicas
     private readonly HISTORICO_KEY = 'dicas_historico';
     private readonly HISTORICO_MAX = 20;

     private carregarHistorico(): string[] {
          const salvo = localStorage.getItem(this.HISTORICO_KEY);
          return salvo ? JSON.parse(salvo) : [];
     }

     private salvarHistorico(historico: string[]): void {
          const recente = historico.slice(-this.HISTORICO_MAX);
          localStorage.setItem(this.HISTORICO_KEY, JSON.stringify(recente));
     }

     // Função para dicas de entrevista na tela "Home".
     async gerarDicaEntrevista(): Promise<string> { // por ser um async, temos que PROMETER uma resposta
          const historico = this.carregarHistorico();

          const prompt = `Faça uma dica de no máximo 2 frases para pessoas que querem fazer entrevistas de emprego na área de TI. Seja objetivo
           mas com uma breve personalidade. Pode ser tanto algo técnico como comportamental.
           Vá direto para a resposta, sem introdução do tipo: 'Para se destacar em entrevistas
           de emprego na área de TI...'. Não dê dicas óbvias, olhe para o mercado de trabalho e seus requisitos atuais.
           
          IMPORTANTE: Não repita nenhuma das dicas abaixo que já foram exibidas:
          ${historico.length > 0 ? historico.join('\n') : '(nenhuma ainda)'}`;

          const dica = await this.chamarIA(prompt)

          historico.push(dica);
          this.salvarHistorico(historico);

          return dica;
     }

     // Função para dicas de entrevista na tela "Feedback" ao final de seções.
     async gerarFeedbackSessao(
          acertos: string[],
          erros: string[],
          nomeTrilha: string,
          descricaoTrilha: string,
          senioridade: string
     ): Promise<string> {
          const prompt = `Você é um tech recruiter profissional que tem uma ótima visão de mercado.
          Diante disso, você deve fazer um feedback para o usuário de acordo com as informações que iremos te passar.
          O user fez um questionário para treinar para entrevistas chamado ${nomeTrilha}, 
          na qual tem como descrição: ${descricaoTrilha} e possui o nivel de ${senioridade}. 
          Foi marcado como "acertado" as peguntas: ${acertos}.
          Foi marcado como "errado" as peguntas: ${erros}.
          
          Diante disso, divida um feedback em duas seções: "Você foi bom em"  e "Para melhorar". Faça ele de forma objetiva, coerente e didática.
          Não se extenda demais.` 
          //O prompt é grande para dar o feedback mais personalizavel possível ao usuário

          return await this.chamarIA(prompt);
     }
}
