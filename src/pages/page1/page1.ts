import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataCenter } from '../../providers/data-center';
import { ServerCommunication } from '../../providers/server-communication';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers : [DataCenter, ServerCommunication]
})
export class Page1 {
  posts : any;
  statusofpaper = true;
  constructor(public navCtrl: NavController,
  public ds : DataCenter,
  public scom : ServerCommunication,
  public http: Http) {
    //this.ds.clearUserMessages();
    this.posts = [];
    //this.ds.setUserDetails('email','1','veeraj');
    this.ds.getUserDetails().then(data => {
    this.http.get(this.scom.servername + 'process_details.php?id=' + data['srno'] ).map(res => res.json()).subscribe(data => {
            this.posts = data;
            if(this.posts.length != 0){
              this.statusofpaper = false;
            }
      }, error => {
        this.posts = [{ datetime : "", process_name : "Failed to retrieve data, Pull down to refresh "}];
        this.statusofpaper = true;
      });
    });
  }


  doRefresh(refresher) {
    setTimeout(() => {
      this.ds.getUserDetails().then(data => {
          this.http.get(this.scom.servername + 'process_details.php?id=' + data['srno'] ).map(res => res.json()).subscribe(data => {
            this.posts = data;
            refresher.complete();
            if(this.posts.length != 0){
              this.statusofpaper = false;
            }
        }, error => {
          this.posts = [{ datetime : "", process_name : "Failed to retrieve data, Pull down to refresh "}];
          this.statusofpaper = true;
          refresher.complete();
        });
      });
    }, 3000);
  }  
}
