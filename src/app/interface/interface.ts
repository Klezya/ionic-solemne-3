export interface Comercial {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    comision: number;
}

export interface Pedido {
    total: string; 
    fecha: string;
    cliente: string;
    comercial: number; 
}