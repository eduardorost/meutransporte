import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AuthService } from '../providers/auth-service';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { EventoVisualizacaoPage } from '../pages/evento/visualizacao/evento.visualizacao';
import { EmpresasAprovarPage } from '../pages/admin/empresas/empresas.aprovar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private auth: AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation

    //TODO: ESCONDER ADMIN QUANDO NÃO FOR.
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Eventos', component: EventoVisualizacaoPage },
      { title: 'Admin', component: EmpresasAprovarPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.auth.getSession())
        this.nav.setRoot(HomePage);
      else
        this.nav.setRoot(LoginPage);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}