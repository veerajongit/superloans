import { Component } from '@angular/core';
import { DataCenter } from '../../providers/data-center';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html'
})
export class Page3 {
  items: any = {};

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public ds : DataCenter, public platform: Platform) {
    this.ds.getUserDetails().then(data => {
      this.items = data;
    } );
  }

  logout(){
    this.ds.clear('usermessages');
    this.ds.clear('userdetails');
    this.platform.exitApp();
  }

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirm logout',
    message: 'Do you really want to logout?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.logout();
        }
      }
    ]
  });
  alert.present();
}



}
