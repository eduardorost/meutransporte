import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EventoVisualizacaoPage } from '../pages/evento/visualizacao/evento.visualizacao';
import { EventoCadastroPage } from '../pages/evento/cadastro/evento.cadastro';
import { EventoDetalhePage } from '../pages/evento/detalhe/evento.detalhe';
import { SelecionarVeiculoPage } from '../pages/evento/detalhe/selecionar-veiculo/selecionar.veiculo';
import { Page2 } from '../pages/page2/page2';
import { AuthService } from '../providers/auth-service';
import { UsuarioService } from '../providers/usuario-service';
import { EventoService } from '../providers/evento-service';

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
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    Page2
  ],
  providers: [AuthService, UsuarioService, EventoService]
  // providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule { }
