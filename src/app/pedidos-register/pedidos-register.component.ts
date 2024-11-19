import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pedido, Comercial } from '../interface/interface';

@Component({
  selector: 'app-pedidos-register',
  templateUrl: './pedidos-register.component.html',
  styleUrls: ['./pedidos-register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PedidosRegisterComponent implements OnInit {
  fecha_hoy = new Date().toISOString().slice(0, 10);

  pedido: Pedido = {
    total: '',
    fecha: this.fecha_hoy,
    cliente: '',
    comercial: '',
  };

  productosSeleccionados: any[] = [];
  productos: any[] = [];
  errorMessage: string = '';
  clientes: any;
  comercial: Comercial = {id: '', nombre: '', apellido1: '', apellido2: '', comision: 0};
  nombreCompleto: string = '';

  constructor(private location: Location, private router: Router, private alertController: AlertController) {}

  async ngOnInit() {
    await this.fetchClientes();
    await this.fetchComercial();
    await this.fetchProductos();
    this.pedido.comercial = this.comercial.id;
    this.nombreCompleto = `${this.comercial.nombre} ${this.comercial.apellido1} ${this.comercial.apellido2}`;
  }

  async fetchClientes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes/');
      this.clientes = response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async fetchComercial() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comerciales/${localStorage.getItem('comercialid')}`);
      this.comercial = response.data;
    } catch (error) {
      console.error('Error al obtener el comercial:', error);
    }
  }

  async fetchProductos() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/');
      this.productos = response.data;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }

  agregarProducto(producto: any, cantidad: number) {
    if (cantidad <= 0) {
      this.showAlert('La cantidad debe ser mayor a 0');
      return;
    }
    if (producto.cantidad_disponible < cantidad) {
      this.showAlert('Inventario insuficiente para el producto ' + producto.nombre);
      return;
    }
    const productoExistente = this.productosSeleccionados.find(p => p.producto.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      this.productosSeleccionados.push({ producto, cantidad });
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.pedido.total = this.productosSeleccionados.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0).toFixed(2);
  }

  async registerPedido(event: Event) {
    event.preventDefault();
    try {
      const pedidoData = {
        ...this.pedido,
        productos: this.productosSeleccionados.map(item => ({ producto: item.producto.id, cantidad: item.cantidad }))
      };
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', pedidoData);
      console.log('Registro exitoso:', response.data);
      alert('Pedido registrado exitosamente');
      this.router.navigate(['/pedido-details'], { state: { pedido: this.pedido } });
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema en el registro');
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

  goBack() {
    this.location.back();
  }

  goToRegisterClient() {
    this.router.navigate(['/cliente-register']);
  }
}