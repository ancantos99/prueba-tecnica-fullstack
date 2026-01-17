import { CommonModule, DatePipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movimiento } from '../../../../core/models/movimiento.model';
import { Cuenta } from '../../../../core/models/cuenta.model';
import { MovimientoService } from '../../../../core/services/movimiento.service';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movimiento-list',
  standalone: true,
  imports: [NgForOf, RouterLink, FormsModule, DatePipe, CommonModule],
  templateUrl: './movimiento-list.component.html',
  styleUrl: './movimiento-list.component.css'
})
export class MovimientoListComponent {
  cuentas: Cuenta[] = [];
  movimientos: Movimiento[] = [];
  filtro = '';
  cuentaSeleccionada?: number;

  constructor(
    private movimientoService: MovimientoService,
    private cuentaService: CuentaService
  ) {}

  ngOnInit(): void {
    this.cargarCuentas();
  }

  cargarCuentas() {
    this.cuentaService.listar().subscribe(data => this.cuentas = data);
  }

  cargarMovimientos() {
    if (!this.cuentaSeleccionada) return;

    this.movimientoService
      .listarPorCuenta(this.cuentaSeleccionada)
      .subscribe({
        next: (data) => { this.movimientos = data;},
        error: err => alert(err.error?.message || 'Error al consultar movimientos')
      })
  }

  movimientosFiltrados() {
    return this.movimientos.filter(m =>
      m.tipomovimiento.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

}
