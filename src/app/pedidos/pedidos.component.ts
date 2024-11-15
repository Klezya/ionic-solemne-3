import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PedidosComponent implements OnInit{
  pedidos: any[] = [];
  clientes: any [] = [];
  errorMessage: string = '';

  constructor() {}

  async ngOnInit() {
    await this.fetchPedidos()
  }

  // Método para obtener los pedidos desde la API al presionar el botón
  async fetchPedidos() {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/pedidos/comercial/${localStorage.getItem('comercialid')}`);
      this.pedidos = response.data;

      this.pedidos = await Promise.all(this.pedidos.map(async (pedido) => {
        const clienteResponse = await axios.get(`http://127.0.0.1:8000/api/clientes/${pedido.cliente}`);
        const cliente = clienteResponse.data;
        return { ...pedido, cliente_nombre: `${cliente.nombre} ${cliente.apellido1} ${cliente.apellido2}` };
      }));

      this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      this.errorMessage = 'Error al obtener los pedidos. Verifique la conexión con la API.';
      console.error('Error al llamar a la API', error);
    }
  }

}


