import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'sobre',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'resultado',
    loadComponent: () => import('./pages/resultado/resultado.page').then( m => m.ResultadoPage)
  },
  {
    path: 'trilha',
    loadComponent: () => import('./pages/trilha/trilha.page').then( m => m.TrilhaPage)
  },
  {
    path: 'sessao',
    loadComponent: () => import('./pages/sessao/sessao.page').then( m => m.SessaoPage)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.page').then( m => m.SobrePage)
  },


];
