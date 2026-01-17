import { Component } from '@angular/core';
import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/cliente.service';
import { NgForOf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmService } from '../../../../share/services/confirm.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {
  clientes: Cliente[] = [];
  filtrados: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private confirmservice: ConfirmService
  ) {

  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  buscar(event: Event) {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtrados = this.clientes.filter(c =>
      c.nombre.toLowerCase().includes(valor)
    );
  }

  cargarClientes(){
    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
      this.filtrados = data;
    });
  }

  eliminar(clienteId: number) {
  this.confirmservice
    .confirm('Está a punto de eliminar el Cliente ¿Dese continuar?')
    .then(confirmado => {
      if (!confirmado) return;
      //this.clientes = this.clientes.filter(c => c.clienteid !== clienteId);
      this.clienteService.eliminar(clienteId).subscribe({
        next: () => this.cargarClientes(),
        error: () => alert('Error al eliminar cliente')
      });
    });
  }
}
