import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor() { }

  confirm(mensaje: string): Promise<boolean> {
    return new Promise(resolve => {
      const ok = window.confirm(mensaje);
      resolve(ok);
    });
  }
}
