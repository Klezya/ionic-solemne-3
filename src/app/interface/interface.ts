export interface Comercial {
    id: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    comision: number;
}

export interface Pedido {
    total: string; 
    fecha: string;
    cliente: string;
    comercial: string; 
}

export interface ProductoSeleccionado {
    producto: string;
    cantidad: number;
}