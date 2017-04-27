import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EventoVisualizacaoPage } from '../pages/evento/visualizacao/evento.visualizacao';
import { EventoCadastroPage } from '../pages/evento/cadastro/evento.cadastro';
import { EventoDetalhePage } from '../pages/evento/detalhe/evento.detalhe';
import { SelecionarVeiculoPage } from '../pages/evento/detalhe/selecionar-veiculo/selecionar.veiculo';
import { ListaTransporteEventoPage } from '../pages/evento/detalhe/lista-transporte/lista.transporte';
import { EmpresasAprovarPage } from '../pages/admin/empresas/empresas.aprovar';
import { AuthService } from '../providers/auth-service';
import { UsuarioService } from '../providers/usuario-service';
import { EventoService } from '../providers/evento-service';
import { EmpresaService } from '../providers/empresa-service';
import { ApiService } from '../providers/api-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    EventoVisualizacaoPage,
    EventoCadastroPage,
    EventoDetalhePage,
    SelecionarVeiculoPage,
    ListaTransporteEventoPage,
    EmpresasAprovarPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    EventoVisualizacaoPage,
    EventoCadastroPage,
    EventoDetalhePage,
    SelecionarVeiculoPage,
    ListaTransporteEventoPage,
    EmpresasAprovarPage
  ],
  providers: [ApiService, AuthService, UsuarioService, EventoService, EmpresaService]
  // providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule { }
