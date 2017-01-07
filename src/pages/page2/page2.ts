import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { DataCenter } from '../../providers/data-center';
import { ServerCommunication } from '../../providers/server-communication';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers : [DataCenter, ServerCommunication]
})
export class Page2 {
  @ViewChild(Content) content: Content;
  userid : any;
  messages : any;
  chatBox : string;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public ds : DataCenter,
  public http: Http,
  public scom : ServerCommunication
  ) {
    this.messages = [];
    this.ds.getUserDetails().then(data => {
      this.userid = data;
      this.getmessagefromdb();
      this.content.scrollToBottom();
    } );
  }



  getmessagefromdb(){
    this.ds.getUserMessages().then(data => {
      if(data == 'Error'){
        this.getmessagefromserver(0);
      }else{
        this.messages = data['array'];
        let no = this.getMax(this.messages, 'srno');
        this.getmessagefromserver(no['srno']);
      }
    }
    );
  }

  getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

  getmessagefromserver(last_id){
    this.ds.getUserDetails().then(data => {
    this.http.get(this.scom.servername + 'getmessages.php?id=' + data['srno'] + "&last_id=" + last_id ).map(res => res.json()).subscribe(data => {
      if(data.length == 0){
        this.getmessagefromdb();
      }else{
        this.ds.getUserMessages().then(data1 => {
          if(data1 != 'Error'){
            for (var i=0 ; i<data.length ; i++) {
              data1['array'].push(data[i]); 
            }
            this.ds.setUserMessages(data1).then(res => this.getmessagefromdb() );
          }else{
            data1 = { array : data };
            this.ds.setUserMessages(data1).then(res => this.getmessagefromdb() );
          }
        }
        );
        this.content.scrollToBottom();
      }
    });
  });
  }



  send(){
    if(this.chatBox.trim() != ''){
      this.ds.getUserDetails().then(data => {
        this.http.get(this.scom.servername + 'setmessages.php?id=' + data['srno'] + "&message=" + this.chatBox.trim() )
        .map(res => res.text()).subscribe(data1 => {
          this.chatBox = '';
        });
      });
    }
  }
}
