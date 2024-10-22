import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent),
  },
  {
    path: 'intermediate',
    loadComponent: () => import('./intermediate/intermediate.component').then(m => m.IntermediateComponent),
  },
  {
    path: 'pedidos',
    loadComponent: () => import('./pedidos/pedidos.component').then(m => m.PedidosComponent),
  },
  {
    path: 'comerciales',
    loadComponent: () => import('./comerciales/comerciales.component').then(m => m.ComercialesComponent),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
];


