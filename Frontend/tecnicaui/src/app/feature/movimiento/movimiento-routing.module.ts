import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientoListComponent } from './pages/movimiento-list/movimiento-list.component';
import { MovimientoRegistroComponent } from './pages/movimiento-registro/movimiento-registro.component';

const routes: Routes = [
  { path: '', component: MovimientoListComponent },
  { path: 'registrar', component: MovimientoRegistroComponent },
  //{ path: 'editar/:id', component: MovimientoRegistroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientoRoutingModule { }
