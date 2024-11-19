import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-pedidos-register',
  templateUrl: './pedidos-register.component.html',
  styleUrls: ['./pedidos-register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PedidosRegisterComponent implements OnInit {
  fecha_hoy = new Date().toISOString().slice(0, 10);

  pedido: any = {
    total: '',
    fecha: this.fecha_hoy,
    cliente: '',
    comercial: '',
  };

  productosSeleccionados: any[] = [];
  productos: any[] = [];
  errorMessage: string = '';
  clientes: any;
  comercial: any = {id: '', nombre: '', apellido1: '', apellido2: '', comision: 0};
  nombreCompleto: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.fetchClientes();
    await this.fetchProductos();
    await this.fetchComercial();
  }

  async fetchClientes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clientes/');
      this.clientes = response.data;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
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

  async fetchComercial() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comerciales/${localStorage.getItem('comercialid')}`);
      this.comercial = response.data;
      this.nombreCompleto = `${this.comercial.nombre} ${this.comercial.apellido1} ${this.comercial.apellido2}`;
    } catch (error) {
      console.error('Error al obtener el comercial:', error);
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
      this.productosSeleccionados.push({ producto: producto.id, cantidad });
    }
    this.calcularTotal();
  }

  calcularTotal() {
    this.pedido.total = this.productosSeleccionados.reduce((total, item) => {
      const producto = this.productos.find(p => p.id === item.producto);
      return total + (producto.precio * item.cantidad);
    }, 0).toFixed(2);
  }

  async registerPedido(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', {
        ...this.pedido,
        productos: this.productosSeleccionados
      });
      console.log('Pedido registrado exitosamente:', response.data);
      alert('Pedido registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar el pedido:', error);
      alert('Hubo un problema al registrar el pedido');
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message,
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