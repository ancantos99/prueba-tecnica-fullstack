import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaListComponent } from './pages/cuenta-list/cuenta-list.component';
import { CuentaFormComponent } from './pages/cuenta-form/cuenta-form.component';

const routes: Routes = [
  { path: '', component: CuentaListComponent },
  { path: 'nuevo', component: CuentaFormComponent },
  { path: 'editar/:id', component: CuentaFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
