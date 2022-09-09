import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './mantenimientos/users/users.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'grafica', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'My Profile' } },

      // Mantenimientos
      { path: 'users', component: UsersComponent, data: { title: 'Users maintenance' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Medicos maintenance' } },
      { path: 'medicos/:id', component: MedicoComponent, data: { title: 'Medicos maintenance' } },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
