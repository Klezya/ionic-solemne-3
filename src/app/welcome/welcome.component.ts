import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]  // Importar los módulos requeridos
})
export class WelcomeComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Credenciales hardcoded
  private validUsername: string = 'admin';
  private validPassword: string = '1234';

  constructor(private router: Router) {}

  // Método de autenticación
  login() {
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.router.navigate(['/intermediate']);  // Redirige al componente intermedio
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo nuevamente.';
    }
  }
  
}
