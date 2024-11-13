import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-cliente-register',
  templateUrl: './cliente-register.component.html',
  styleUrls: ['./cliente-register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ClienteRegisterComponent {
  client = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    ciudad: '',
    categoria: 0,
  };

  errorMessage: string = '';  // Define errorMessage como una propiedad de tipo string

  constructor(private location: Location) {} // Inyectar Location


  async registerClient(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clientes/', this.client);
      console.log('Registro exitoso:', response.data);
      alert('Cliente registrado exitosamente');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema en el registro');
    }
  }

  goBack() {
    this.location.back(); // Regresar a la vista anterior
  }

}
