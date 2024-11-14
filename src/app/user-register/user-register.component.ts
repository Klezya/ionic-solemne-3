import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location



@Component({
  selector: 'app-user-register',
  standalone: true,
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserRegisterComponent {
  user = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    comision: '',
    password: '',
  };

  errorMessage: string = '';  // Define errorMessage como una propiedad de tipo string

  constructor(private location: Location) {} // Inyectar Location


  async registerUser(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('https://ventas-solemne-3.onrender.com/api/comerciales/', this.user);
      console.log('Registro exitoso:', response.data);
      alert('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema en el registro');
    }
  }

  goBack() {
    this.location.back(); // Regresar a la vista anterior
  }

}
