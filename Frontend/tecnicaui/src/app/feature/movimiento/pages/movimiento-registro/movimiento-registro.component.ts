import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { MovimientoService } from '../../../../core/services/movimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from '../../../../core/models/cuenta.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-movimiento-registro',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './movimiento-registro.component.html',
  styleUrl: './movimiento-registro.component.css'
})
export class MovimientoRegistroComponent {

  form!: FormGroup;
  cuentas: Cuenta[] = [];
  mensajeError = '';
  mensajeExito = '';

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private cuentaService: CuentaService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarCuentas();
  }

  private fechahoy(): string {
    const ahora = new Date();
    return ahora.toISOString().slice(0, 16);
  }

  crearFormulario(){
    this.form = this.fb.group({
      cuentaid: ['', Validators.required],
      fecha: [this.fechahoy(), Validators.required],
      tipomovimiento: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(1)]],      
    });
  }

  cargarCuentas() {
    this.cuentaService.listar().subscribe(data => this.cuentas = data);
  }

  guardar() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.movimientoService.crear(this.form.value).subscribe({
      next: () => {
        this.mensajeExito = 'Movimiento registrado correctamente';
        this.form.reset();
      },
      error: err => {
        this.mensajeError = err?.error?.message || 'Error al registrar movimiento';
      }
    });
  }

}
