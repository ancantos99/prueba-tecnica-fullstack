import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadoCuentaComponent } from './pages/estado-cuenta/estado-cuenta.component';

const routes: Routes = [
  { path: '', component: EstadoCuentaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
