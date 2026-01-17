import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  crear(cliente: Cliente) {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }
  obtenerPorId(id: number) {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }
  actualizar(id: number, cliente: Cliente) {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }
  eliminar(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
