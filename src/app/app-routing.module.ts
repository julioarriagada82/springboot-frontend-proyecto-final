import { GuardService } from './_service/guard.service';
import { CargoComponent } from './pages/cargo/cargo.component';
import { CasaComponent } from './pages/casa/casa.component';
import { CondominioComponent } from './pages/condominio/condominio.component';
import { DirectivaComponent } from './pages/directiva/directiva.component';
import { LoginComponent } from './pages/login/login.component';
import { HorarioTurnoComponent } from './pages/horario-turno/horario-turno.component';
import { IntegranteComponent } from './pages/integrante/integrante.component';
import { ListaNegraComponent } from './pages/lista-negra/lista-negra.component';
import { OcupacionComponent } from './pages/ocupacion/ocupacion.component';
import { ParentescoComponent } from './pages/parentesco/parentesco.component';
import { PeriodoHorarioComponent } from './pages/periodo-horario/periodo-horario.component';
import { PorteroComponent } from './pages/portero/portero.component';
import { TipoCondominioComponent } from './pages/tipo-condominio/tipo-condominio.component';
import { CasaEdicionComponent } from './pages/casa/casa-edicion/casa-edicion.component';
import { CondominioEdicionComponent } from './pages/condominio/condominio-edicion/condominio-edicion.component';
import { DirectivaEdicionComponent } from './pages/directiva/directiva-edicion/directiva-edicion.component';
import { HorarioTurnoEdicionComponent } from './pages/horario-turno/horario-turno-edicion/horario-turno-edicion.component';
import { IntegranteEdicionComponent } from './pages/integrante/integrante-edicion/integrante-edicion.component';
import { ListaNegraEdicionComponent } from './pages/lista-negra/lista-negra-edicion/lista-negra-edicion.component';
import { PorteroEdicionComponent } from './pages/portero/portero-edicion/portero-edicion.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { Not403Component } from './pages/not403/not403.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'horario-turno', component: HorarioTurnoComponent, children: [
      { path: 'nuevo', component: HorarioTurnoEdicionComponent },
      { path: 'edicion/:id', component: HorarioTurnoEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'lista-negra', component: ListaNegraComponent, children: [
      { path: 'nuevo', component: ListaNegraEdicionComponent },
      { path: 'edicion/:id', component: ListaNegraEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'integrante', component: IntegranteComponent, children: [
      { path: 'nuevo', component: IntegranteEdicionComponent },
      { path: 'edicion/:id', component: IntegranteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'portero', component: PorteroComponent, children: [
      { path: 'nuevo', component: PorteroEdicionComponent },
      { path: 'edicion/:id', component: PorteroEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'directiva', component: DirectivaComponent, children: [
      { path: 'nuevo', component: DirectivaEdicionComponent },
      { path: 'edicion/:id', component: DirectivaEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'casa', component: CasaComponent, children: [
      { path: 'nuevo', component: CasaEdicionComponent },
      { path: 'edicion/:id', component: CasaEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'condominio', component: CondominioComponent, children: [
      { path: 'nuevo', component: CondominioEdicionComponent },
      { path: 'edicion/:id', component: CondominioEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'cargo', component: CargoComponent, canActivate: [GuardService] },
  { path: 'ocupacion', component: OcupacionComponent, canActivate: [GuardService] },
  { path: 'parentesco', component: ParentescoComponent, canActivate: [GuardService] },
  { path: 'tipo-condominio', component: TipoCondominioComponent, canActivate: [GuardService] },
  { path: 'periodo-horario', component: PeriodoHorarioComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'not-403', component: Not403Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
