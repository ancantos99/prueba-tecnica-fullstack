import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../models/cuenta.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl = 'http://localhost:8080/api/cuentas';
  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get<Cuenta[]>(this.apiUrl);
  }
  listarPorCliente(clienteid: number){
    return this.http.get<Cuenta[]>(`${this.apiUrl}/cliente/${clienteid}`);
  }
  obtenerPorId(id: number){
    return this.http.get<Cuenta>(`${this.apiUrl}/${id}`);
  }
  crear(cuenta: Cuenta){
    return this.http.post<Cuenta>(this.apiUrl, cuenta);
  }
  actualizar(id: number, cuenta: Cuenta){
    return this.http.put<Cuenta>(`${this.apiUrl}/${id}`, cuenta);
  }
  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
