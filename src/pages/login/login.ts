import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataCenter } from '../../providers/data-center';
import { ServerCommunication } from '../../providers/server-communication';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MyApp } from '../../app/app.component';
@Component({
  selector: 'rootPage',
  templateUrl: 'login.html',
  providers : [DataCenter, ServerCommunication]
})
export class login {
    email = '';
    password = '';
    constructor(public http: Http,public scom : ServerCommunication,
    public dc : DataCenter,public alertCtrl: AlertController, 
    public navCtrl: NavController
    ){

      
    }


    login(){
      if(this.email != '' && this.password != ''){
        this.http.get(this.scom.servername + 'login.php?email=' + this.email + '&password=' + this.password ).map(res => res.json()).subscribe(data => {
          if(data.length == 0){
            let alert = this.alertCtrl.create({
            subTitle: 'Login Failed',
            buttons: ['OK']
          });
          alert.present();
          }else{
            this.dc.setUserDetails(data[0]);
            location.reload();
            //this.navCtrl.setRoot(MyApp);
          }
      });
      }else{
        let alert = this.alertCtrl.create({
          subTitle: 'Please Enter Username and Password',
          buttons: ['OK']
        });
        alert.present();
      }
    }
}