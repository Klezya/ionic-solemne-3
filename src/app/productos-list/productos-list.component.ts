import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]

})
export class ProductosListComponent  implements OnInit {
  productos: any[] = [];
  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
    this.fetchComerciales();
  }
  // Método para obtener los comerciales desde la API
  async fetchComerciales() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos');
      this.productos = response.data;
      console.log(this.productos)
      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      this.errorMessage = 'Error al obtener los productos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }
}

