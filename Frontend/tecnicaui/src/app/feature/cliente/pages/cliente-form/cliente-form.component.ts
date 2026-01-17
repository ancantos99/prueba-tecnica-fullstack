import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent {

  esEdicion = false;
  clienteId: number =0;

  form = this.fb.group({
    nombre: ['', Validators.required],
    genero: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(18)]],
    identificacion: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    password: ['', Validators.required],
    estado: [true]
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.clienteId = Number(id);
      this.cargarCliente();
    }
  }

  cargarCliente() {
    this.clienteService.obtenerPorId(this.clienteId)
      .subscribe( (cliente) => this.form.patchValue(cliente));
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const peticionapi = this.esEdicion
      ? this.clienteService.actualizar(this.clienteId, this.form.value as any)
      : this.clienteService.crear(this.form.value as any);

    peticionapi.subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: err =>{ 
          console.log(err);
          alert(err.error?.message || 'Error al guardar cliente')
        }
      });
  }

}
