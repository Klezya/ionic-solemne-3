import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedidos-register',
  templateUrl: './pedidos-register.component.html',
  styleUrls: ['./pedidos-register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PedidosRegisterComponent implements OnInit{

  fecha_hoy = new Date().toISOString().slice(0, 10);

  pedido = {
    total: '',
    fecha: this.fecha_hoy,
    cliente: '',
    comercial: '',
  };

  errorMessage: string = '';  // Define errorMessage como una propiedad de tipo string
  clientes: any;
  data_comercial: any;

  constructor(private location: Location) {console.log(this.data_comercial)} // Inyectar Location


  ngOnInit() {
    this.fetchClientes();
    this.data_comercial = localStorage.getItem('comercial')
    this.pedido.comercial = this.data_comercial.nombre
  }

  async fetchClientes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes/');
      this.clientes = response.data; // Guarda la lista de clientes obtenida de la API
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }



  async registerPedido(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', this.pedido);
      console.log('Registro exitoso:', response.data);
      alert('Pedido registrado exitosamente');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema en el registro');
    }
  }

  goBack() {
    this.location.back(); // Regresar a la vista anterior
  }
}
