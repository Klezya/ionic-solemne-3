import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Pedido } from '../interface/interface';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-details',
  templateUrl: './pedido-details.component.html',
  styleUrls: ['./pedido-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class PedidoDetailsComponent  implements OnInit {
  pedido: Pedido;

  constructor(private router: Router) {
    this.pedido = {
      total: '',
      fecha: '',
      cliente: '',
      comercial: '',
    };
  }

  async ngOnInit() {
    this.pedido = history.state.pedido
    await this.fetchCliente()
    await this.fetchComercial()
  }

  async fetchCliente() {
    try {
      const response = await axios.get(`https://ventas-solemne-3.onrender.com/api/clientes/${this.pedido.cliente}`);
      this.pedido.cliente = `${response.data.nombre} ${response.data.apellido1} ${response.data.apellido1}`; // Guarda la lista de clientes obtenida de la API
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async fetchComercial() {
    try {
      const response = await axios.get(`https://ventas-solemne-3.onrender.com/api/comerciales/${this.pedido.comercial}`);
      this.pedido.comercial = `${response.data.nombre} ${response.data.apellido1} ${response.data.apellido1}`; // Guarda el comercial obtenido de la API
    } catch (error) {
      console.error('Error al obtener el comercial:', error);
    }
  }
  
  goBack() {
    this.router.navigate(['/intermediate']); // Regresar a la vista anterior
  }

}
