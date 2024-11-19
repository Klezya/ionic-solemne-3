import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  nuevoProducto = {
    nombre: '',
    precio: 0,
    cantidad_disponible: 0
  };
  errorMessage: string = '';

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.fetchProductos();
  }

  async fetchProductos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/');
      this.productos = response.data;
    } catch (error) {
      this.errorMessage = 'Error al obtener los productos. Verifique la conexión con la API.';
    }
  }

  async crearProducto() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/productos/', this.nuevoProducto);
      this.productos.push(response.data);
      this.nuevoProducto = { nombre: '', precio: 0, cantidad_disponible: 0 };
      this.showAlert('Producto creado exitosamente.');
    } catch (error) {
      this.errorMessage = 'Error al crear el producto. Verifique la conexión con la API.';
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
