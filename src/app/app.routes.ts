import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'welcome', loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'intermediate', loadComponent: () => import('./intermediate/intermediate.component').then(m => m.IntermediateComponent) },
  { path: 'pedidos', loadComponent: () => import('./pedidos/pedidos.component').then(m => m.PedidosComponent) },
  { path: 'comerciales', loadComponent: () => import('./comerciales/comerciales.component').then(m => m.ComercialesComponent) },
  { path: 'user-register', loadComponent: () => import('./user-register/user-register.component').then(m => m.UserRegisterComponent) },
  { path: 'cliente-register', loadComponent: () => import('./cliente-register/cliente-register.component').then(m => m.ClienteRegisterComponent) },
  { path: 'pedidos-register', loadComponent: () => import('./pedidos-register/pedidos-register.component').then(m => m.PedidosRegisterComponent) },
  { path: 'pedido-details', loadComponent: () => import('./pedido-details/pedido-details.component').then(m => m.PedidoDetailsComponent)},
  { path: 'productos-list', loadComponent: () => import('./productos-list/productos-list.component').then(m => m.ProductosListComponent)},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
