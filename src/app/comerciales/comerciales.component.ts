import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-comerciales',
  templateUrl: './comerciales.component.html',
  styleUrls: ['./comerciales.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ComercialesComponent implements OnInit {
  comerciales: any[] = [];
  errorMessage: string = '';

  constructor() {}

  ngOnInit() {
    this.fetchComerciales();
  }
  // Método para obtener los comerciales desde la API
  async fetchComerciales() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/comerciales');
      this.comerciales = response.data;
      console.log(this.comerciales)
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      this.errorMessage = 'Error al obtener los comerciales. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }
}
