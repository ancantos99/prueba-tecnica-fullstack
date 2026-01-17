import { Component } from '@angular/core';
import { Cuenta } from '../../../../core/models/cuenta.model';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { ConfirmService } from '../../../../share/services/confirm.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cuenta-list',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './cuenta-list.component.html',
  styleUrl: './cuenta-list.component.css'
})
export class CuentaListComponent {
  cuentas: Cuenta[] = [];
  filtrados: Cuenta[] = [];

  constructor(
    private cuentaservice: CuentaService,
    private confirmservice: ConfirmService
  ) {

  }

  ngOnInit(): void {
    this.cargarCuentas();
  }

  buscar(event: Event) {
    const valor = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtrados = this.cuentas.filter(c =>
      c.numerocuenta.toLowerCase().includes(valor) || c.clientenombre.toLowerCase().includes(valor)
    );
  }

  cargarCuentas(){
    this.cuentaservice.listar().subscribe(data => {
      this.cuentas = data;
      this.filtrados = data;
    });
  }

  eliminar(cuentaid: number) {
  this.confirmservice
    .confirm('Está a punto de eliminar la Cuenta ¿Dese continuar?')
    .then(confirmado => {
      if (!confirmado) return;
      this.cuentaservice.eliminar(cuentaid).subscribe({
        next: () => this.cargarCuentas(),
        error: () => alert('Error al eliminar cuenta')
      });
    });
  }
}
