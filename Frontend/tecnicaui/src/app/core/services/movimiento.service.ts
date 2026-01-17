import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimiento, MovimientoRequest, ReporteEstadoCuenta } from '../models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = 'http://localhost:8080/api/movimientos';
  constructor(private http: HttpClient) {}

  crear(movimiento: MovimientoRequest) {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }

  listarPorCuenta(cuentaId: number) {
    return this.http.get<Movimiento[]>(`${this.apiUrl}/cuenta/${cuentaId}`);
  }

  obtenerReporte(clienteid: number, fechainicio: string, fechafin: string){
    const filtro = { clienteid, fechainicio, fechafin };
    return this.http.post<Movimiento[]>(`${this.apiUrl}/reportes`, filtro);
  }

  obtenerReportepdf(clienteid: number, fechainicio: string, fechafin: string){
    const filtro = { clienteid, fechainicio, fechafin };
    return this.http.post<ReporteEstadoCuenta>(`${this.apiUrl}/reportes/pdf`, filtro);
  }
}
