import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CuentaService } from './cuenta.service';
import { Cuenta } from '../models/cuenta.model';

fdescribe('CuentaService', () => {
  let service: CuentaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //simular http
      providers: [CuentaService]
    });
    service = TestBed.inject(CuentaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); //verifica q no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test del Get', () => {
    const pruebascuentas: Cuenta[] = [
      { id: 1, numero: '12345', saldo: 100 } as any,
      { id: 2, numero: '67890', saldo: 500 } as any
    ];
    const clienteId = 10;

    service.listarPorCliente(clienteId).subscribe(cuentas => {
      expect(cuentas.length).toBe(2);
      expect(cuentas).toEqual(pruebascuentas);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/cuentas/cliente/${clienteId}`);
    expect(req.request.method).toBe('GET');
    req.flush(pruebascuentas); // Simula la respuesta del servidor
  });
});
