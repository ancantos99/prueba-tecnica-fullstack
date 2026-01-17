import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaComponent } from './estado-cuenta.component';
import { MovimientoService } from '../../../../core/services/movimiento.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { CuentaService } from '../../../../core/services/cuenta.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

fdescribe('EstadoCuentaComponent', () => {
  let component: EstadoCuentaComponent;
  let fixture: ComponentFixture<EstadoCuentaComponent>;

  let movimientoServiceSpy: jasmine.SpyObj<MovimientoService>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;
  let cuentaServiceSpy: jasmine.SpyObj<CuentaService>;

  beforeEach(async () => {
    movimientoServiceSpy = jasmine.createSpyObj('MovimientoService', ['listar', 'obtenerReporte']);
    clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['listar']);
    cuentaServiceSpy = jasmine.createSpyObj('CuentaService', ['listarPorCliente']);
    clienteServiceSpy.listar.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [EstadoCuentaComponent, FormsModule],
      providers: [
        { provide: MovimientoService, useValue: movimientoServiceSpy },
        { provide: ClienteService, useValue: clienteServiceSpy },
        { provide: CuentaService, useValue: cuentaServiceSpy },
        provideHttpClient() 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar fechaInicio y fechaFin con el mes actual', () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    
    // Verificamos que la fecha de inicio empiece con el año y mes actual y día 01
    expect(component.fechaInicio).toContain(`${año}-${mes}-01T00:00`);
    expect(component.fechaFin).toContain('T23:59');
  });

  it('debe mostrar error si falta seleccionar un cliente', () => {
    component.clienteSeleccionado = undefined;
    component.obtenerReporte();

    expect(component.errorMensaje).toBe('Complete todos los campos (Cliente, Fecha Inicio y Fecha Fin).');
    expect(movimientoServiceSpy.obtenerReporte).not.toHaveBeenCalled();
  });

});
