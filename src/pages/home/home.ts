import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo().subscribe(
      user => this.username = user.name,
      error => console.log(error)
    );
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }
}

// @Component({
//   selector: 'page-page1',
//   templateUrl: 'page1.html'
// })
// export class Page1 {

//   constructor(public navCtrl: NavController) {
    
//   }

// }
