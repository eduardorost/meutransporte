import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, Platform, ActionSheetController } from 'ionic-angular';

import { AuthService } from '../../../providers/auth-service';
import { EmpresaService } from '../../../providers/empresa-service'
import { LoginPage } from '../../login/login';

@Component({
  selector: 'empresas-aprovar',
  templateUrl: 'empresas.aprovar.html'
})
export class EmpresasAprovarPage {

  empresas;
  aprovarSuccess;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private alertCtrl: AlertController,
    public platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    private auth: AuthService, 
    private empresaService: EmpresaService) {
      this.empresaService.empresasAprovar().subscribe(empresas => this.empresas = empresas);
  }

  presentActionSheet(id) {
    this.actionSheet(id).present();
  }

  public aprovarEmpresa(id) {
    this.empresaService.aprovarEmpresa(id).subscribe((success, empresa) => {
      if (success) {
        this.aprovarSuccess = true;
        this.empresas = this.empresas.filter(empresa => empresa.id !== id);
        this.showPopup("Successo", "Empresa aprovada com sucesso.");
      } else {
        this.showPopup("Erro", "Erro ao aprovar empresa.");
      }
    },
      error => {
        this.showPopup("Erro", error);
      });
  }

  public removerEmpresa(id) {
    this.empresaService.removerEmpresa(id).subscribe(success => {
      if (success) {
        this.aprovarSuccess = true;
        this.empresas = this.empresas.filter(empresa => empresa.id !== id);
        this.showPopup("Successo", "Empresa removida com sucesso.");
      } else {
        this.showPopup("Erro", "Erro ao remover empresa.");
      }
    },
      error => {
        this.showPopup("Erro", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.aprovarSuccess) {
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

  actionSheet(id) {
    return this.actionSheetCtrl.create({
      title: 'Ações',
      buttons: [
        {
          text: 'Aprovar',
          icon: !this.platform.is('ios') ? 'md-checkmark' : null,
          handler: () => {
            this.aprovarEmpresa(id);
          }
        },
        {
          text: 'Deletar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removerEmpresa(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
