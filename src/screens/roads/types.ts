export interface Pedido {
    id: number;
    nombre: string;
    direccion: string;
    kilosTortilla: number;
    horaEntrega: string;
    telefono: string;
  }
  
  export interface Ruta {
    id: number;
    nombre: string;
    fechaAsignada: string;
    direccion: string;
    totalEntregas: number;
    kilometraje: number;
    tiempoEstimado: string;
    pedidos: Pedido[];
  }