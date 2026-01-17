import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/cliente.service';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../../../core/models/cliente.model';

@Component({
  selector: 'app-cuenta-form',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './cuenta-form.component.html',
  styleUrl: './cuenta-form.component.css'
})
export class CuentaFormComponent {
  esEdicion = false;
  cuentaId: number = 0;
  clientes: Cliente[] = [];

  form = this.fb.group({
    numerocuenta: ['', Validators.required],
    tipocuenta: ['', Validators.required],
    saldoinicial: [0, [Validators.required, Validators.min(0)]],
    estado: [true],
    clienteid: [0, [Validators.required, Validators.min(1)]],
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private cuentaService: CuentaService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.cuentaId = Number(id);
      this.cargarCuenta();
    }

    this.clienteService.listar().subscribe(data => {
      this.clientes = data;
    });
  }

  cargarCuenta() {
    this.cuentaService.obtenerPorId(this.cuentaId)
      .subscribe( (cuenta) => this.form.patchValue(cuenta));
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const peticionapi = this.esEdicion
      ? this.cuentaService.actualizar(this.cuentaId, this.form.value as any)
      : this.cuentaService.crear(this.form.value as any);

    peticionapi.subscribe({
        next: () => this.router.navigate(['/cuentas']),
        error: err => alert(err.error?.message || 'Error al guardar Cuenta')
      });
  }
}
