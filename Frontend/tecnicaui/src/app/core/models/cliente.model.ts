export interface Cliente {
  clienteid: number;
  nombre: string;
  genero: string;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  estado: boolean;
  password: string;
}

//export type ClienteFrm = Omit<Cliente, 'clienteid'>;