import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UsuarioService } from '../../providers/usuario-service';
import { LoginPage } from '../login/login';
import { EventoDetalhePage } from '../evento/detalhe/evento.detalhe';

import { Usuario } from '../../models/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario: Usuario;
  eventos;
  eventosTransporte;
  menu = 'transportes';

  ionViewWillEnter() {
    this.usuarioService.eventos(this.usuario.id).subscribe(eventos => this.eventos = eventos)
    this.usuarioService.eventosTransporte(this.usuario.id).subscribe(eventos => this.eventosTransporte = eventos)
  }

  constructor(private nav: NavController, private auth: AuthService, private usuarioService: UsuarioService) {
    this.usuario = this.auth.getUsuario();
  }

  public detalheEvento(evento) {
    this.nav.push(EventoDetalhePage, { evento: evento, canEdit: true });
  }

  public detalheEventoTransporte(evento) {
    this.nav.push(EventoDetalhePage, { evento: evento, canEdit: false });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage);
    });
  }
}