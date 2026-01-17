import { Routes } from '@angular/router';
import { PrincipalComponent } from './layout/principal/principal.component';

export const routes: Routes = [
    {path: '', component: PrincipalComponent,
        children: [
        { path: 'clientes', loadChildren: () => import('./feature/cliente/cliente.module').then(m => m.ClienteModule) },
        { path: 'cuentas', loadChildren: () => import('./feature/cuenta/cuenta.module').then(m => m.CuentaModule) },
        { path: 'movimientos', loadChildren: () => import('./feature/movimiento/movimiento.module').then(m => m.MovimientoModule) },
        { path: 'reportes', loadChildren: () => import('./feature/reporte/reporte.module').then(m => m.ReporteModule) },
        { path: '', redirectTo: 'clientes', pathMatch: 'full' }
    ]
    }
];
