import { ServerErrorsInterceptor } from './_shared/server-errors.interceptor';
import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CargoDialogoComponent } from './pages/cargo/cargo-dialogo/cargo-dialogo.component';
import { ParentescoDialogoComponent } from './pages/parentesco/parentesco-dialogo/parentesco-dialogo.component';
import { TipoCondominioDialogoComponent } from './pages/tipo-condominio/tipo-condominio-dialogo/tipo-condominio-dialogo.component';
import { PeriodoHorarioDialogoComponent } from './pages/periodo-horario/periodo-horario-dialogo/periodo-horario-dialogo.component';
import { OcupacionDialogoComponent } from './pages/ocupacion/ocupacion-dialogo/ocupacion-dialogo.component';

export function tokenGetter(){
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    CargoComponent,
    CasaComponent,
    CondominioComponent,
    DirectivaComponent,
    LoginComponent,
    HorarioTurnoComponent,
    IntegranteComponent,
    ListaNegraComponent,
    OcupacionComponent,
    ParentescoComponent,
    PeriodoHorarioComponent,
    PorteroComponent,
    TipoCondominioComponent,
    CasaEdicionComponent,
    CondominioEdicionComponent,
    DirectivaEdicionComponent,
    HorarioTurnoEdicionComponent,
    IntegranteEdicionComponent,
    ListaNegraEdicionComponent,
    PorteroEdicionComponent,
    RecuperarComponent,
    TokenComponent,
    Not403Component,
    CargoDialogoComponent,
    OcupacionDialogoComponent,
    ParentescoDialogoComponent,
    TipoCondominioDialogoComponent,
    PeriodoHorarioDialogoComponent
  ],
  entryComponents: [CargoDialogoComponent, OcupacionDialogoComponent, TipoCondominioDialogoComponent, ParentescoDialogoComponent, PeriodoHorarioDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/login/enviarCorreo']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

