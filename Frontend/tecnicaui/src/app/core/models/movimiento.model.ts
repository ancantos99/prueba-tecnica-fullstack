import { Cliente } from "./cliente.model";
import { Cuenta } from "./cuenta.model";

export interface Movimiento {
  movimientoid?: number;
  fecha?: string;
  tipomovimiento: 'CREDITO' | 'DEBITO';
  valor: number;
  saldoanterior: number;
  saldo?: number;
  cuenta: Cuenta;
  cliente: Cliente;
}


export interface MovimientoRequest {
  cuentaid: number;
  tipomovimiento: 'CREDITO' | 'DEBITO';
  valor: number;
  fecha?: string;
}


export interface ReporteEstadoCuenta {
  cuentas: Cuenta[];
  cliente: Cliente;
  fechainicio: string;
  fechafin: string;
  totaldebito: number;
  totalcredito: number;
  pdfbase64: string;
}
