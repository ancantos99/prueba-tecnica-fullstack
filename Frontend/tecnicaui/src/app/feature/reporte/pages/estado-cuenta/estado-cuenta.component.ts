import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovimientoService } from '../../../../core/services/movimiento.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { Cliente } from '../../../../core/models/cliente.model';
import { Movimiento, ReporteEstadoCuenta } from '../../../../core/models/movimiento.model';
import { Cuenta } from '../../../../core/models/cuenta.model';
import { CuentaService } from '../../../../core/services/cuenta.service';

@Component({
  selector: 'app-estado-cuenta',
  standalone: true,
  imports: [NgForOf,NgIf, RouterLink, FormsModule, DatePipe, CommonModule],
  templateUrl: './estado-cuenta.component.html',
  styleUrl: './estado-cuenta.component.css'
})
export class EstadoCuentaComponent {
  clientes: Cliente[] = [];
  cuentas: Cuenta[] = [];
  movimientos: Movimiento[] = [];
  reporteestadocta?: ReporteEstadoCuenta;
  clienteSeleccionado?: number;
  fechaInicio: string = '';
  fechaFin: string = '';
  errorMensaje: string = ''; 
  constructor(
      private movimientoService: MovimientoService,
      private cuentasService: CuentaService,
      private clienteService: ClienteService,      
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    /**para pruebas primer y ultimo dia del mes x defecto*/
    const ahora = new Date();
    const primerDia = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    this.fechaInicio = this.formatearFecha(primerDia, '00:00');
    const ultimoDia = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0);
    this.fechaFin = this.formatearFecha(ultimoDia, '23:59');
  }

  cargarClientes() {
    this.clienteService.listar().subscribe(data => this.clientes = data);
  } 

  filtrarPorCuenta(numeroCuenta: string) {
    return this.movimientos.filter(m => m.cuenta.numerocuenta === numeroCuenta);
  }

  getUltimoSaldo(numeroCuenta: string): number {
    const movs = this.filtrarPorCuenta(numeroCuenta);
    return movs.length > 0 ? (movs[movs.length - 1].saldo ?? 0) : 0;   //asumo que esta ordenano por fecha
  }

  obtenerReporte() {
    this.errorMensaje = ''; 
    if (!this.clienteSeleccionado || !this.fechaInicio || !this.fechaFin) {
      this.errorMensaje = 'Complete todos los campos (Cliente, Fecha Inicio y Fecha Fin).';
      return;
    }
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);
    if (fin < inicio) {
      this.errorMensaje = 'La fecha de fin no puede ser menor a la fecha de inicio.';
      this.movimientos = []; 
      return;
    }
    this.cuentasService.listarPorCliente(this.clienteSeleccionado).subscribe(data => this.cuentas = data);
    this.movimientoService
      .obtenerReporte(this.clienteSeleccionado, this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data) => { 
          this.movimientos = data; 
          if (data.length === 0) this.errorMensaje = 'No se encontraron movimientos en este rango.';
        },
        error: (err) => {
          this.errorMensaje = err.error?.message || 'Error al consultar Estado de Cuenta';
        }
      })
  }

  obtenerReportepdf(){
    this.errorMensaje = ''; 
    if (!this.clienteSeleccionado || !this.fechaInicio || !this.fechaFin) {
      this.errorMensaje = 'Complete todos los campos (Cliente, Fecha Inicio y Fecha Fin).';
      return;
    }
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);
    if (fin < inicio) {
      this.errorMensaje = 'La fecha de fin no puede ser menor a la fecha de inicio.';
      this.movimientos = []; 
      return;
    }
    this.movimientoService
      .obtenerReportepdf(this.clienteSeleccionado, this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data) => { 
          this.reporteestadocta = data; 
          const base64 = this.reporteestadocta.pdfbase64;
          const blob = this.convertirBase64aBlob(base64, 'application/pdf');
          //saveAs(blob, 'estado_cuenta.pdf');
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'estado-cuenta.pdf';
          a.click();
        },
        error: (err) => {
          this.errorMensaje = err.error?.message || 'Error al consultar Estado de Cuenta';
        }
      })
  }

  private formatearFecha(date: Date, hora: string): string {
    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}T${hora}`;
  }

  private convertirBase64aBlob(base64: string, tipo: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: tipo });
}
}
