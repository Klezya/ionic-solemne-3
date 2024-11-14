import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import axios from 'axios';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Comercial, Pedido } from '../interface/interface'

@Component({
  selector: 'app-pedidos-register',
  templateUrl: './pedidos-register.component.html',
  styleUrls: ['./pedidos-register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PedidosRegisterComponent implements OnInit{

  fecha_hoy = new Date().toISOString().slice(0, 10);

  pedido: Pedido = {
    total: '',
    fecha: this.fecha_hoy,
    cliente: '',
    comercial: '',
  };

  errorMessage: string = '';  // Define errorMessage como una propiedad de tipo string
  clientes: any;
  comercial: Comercial = {id: '', nombre: '', apellido1: '', apellido2: '', comision: 0};
  nombreCompleto: string = ''
  

  constructor(private location: Location, private router: Router) {} // Inyectar Location


  async ngOnInit() {
    await this.fetchClientes();
    await this.fetchComercial();
    this.pedido.comercial = this.comercial.id
    this.nombreCompleto = `${this.comercial.nombre} ${this.comercial.apellido1} ${this.comercial.apellido2}`
  }

  async fetchClientes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes/');
      this.clientes = response.data; // Guarda la lista de clientes obtenida de la API
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async fetchComercial() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comerciales/${localStorage.getItem('comercialid')}`);
      this.comercial = response.data; // Guarda el comercial obtenido de la API
    } catch (error) {
      console.error('Error al obtener el comercial:', error);
    }
  }


  async registerPedido(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', this.pedido);
      console.log('Registro exitoso:', response.data);
      alert('Pedido registrado exitosamente');
      this.router.navigate(['/pedido-details'], { state: { pedido: this.pedido } })
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema en el registro');
    }
  }

  goBack() {
    this.location.back(); // Regresar a la vista anterior
  }

  goToRegisterClient() {
    this.router.navigate(['/client-register'])
  }
}
