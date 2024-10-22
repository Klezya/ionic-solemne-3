import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intermediate',
  templateUrl: './intermediate.component.html',
  styleUrls: ['./intermediate.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IntermediateComponent {

  constructor(private router: Router) {}

  // Método para redirigir al Home
  goToHome() {
    this.router.navigate(['/home']);
  }

  goToPedidos(){
    this.router.navigate(['/pedidos'])
  }

 // Método para redirigir a Comerciales
 goToComerciales() {
  this.router.navigate(['/comerciales']);
}

}
