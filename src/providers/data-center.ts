import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';


/*
  Generated class for the DataCenter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataCenter {
  tmp : string;
  constructor(public http: Http, public platform: Platform) {
    console.log('Hello DataCenter Provider');
  }


  setUserDetails(data){
     this.platform.ready().then(() => {
       if(this.platform.is("android")){
          NativeStorage.setItem('userdetails', data)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
       }else{
         localStorage.setItem('userdetails', JSON.stringify(data));
       }
     });
  }


  setUserMessages(data){
    if(data == 'undefined'){
      data = [];
    }
    return new Promise(resolve => {
      this.platform.ready().then(() => {
        if(this.platform.is("android")){
            NativeStorage.setItem('usermessages', data)
          .then(
            data => {resolve('success'); console.log('Item stored')},
            error => console.error('Error storing item', error)
          );
        }else{
          localStorage.setItem('usermessages', JSON.stringify(data));
          resolve('success');
        }
      });
    });
  }

  getUserMessages(){
  return new Promise(resolve => {
        this.platform.ready().then(() => {
          if(this.platform.is("android")){
        NativeStorage.getItem('usermessages')
        .then(
          data => { resolve(data) },
          error => { resolve('Error'); }
        );
      }else{
        if(localStorage.getItem('usermessages') == null){
          resolve('Error');
        }else{
          resolve(JSON.parse(localStorage.getItem('usermessages')));
        }
      }
    });
  });
  }

  clear(tname : string){
    this.platform.ready().then(() => {
      if(this.platform.is("android")){
        NativeStorage.remove(tname);
      }else{
        localStorage.removeItem(tname);
      }
    });
  }


  getUserDetails(){
  return new Promise(resolve => {
        this.platform.ready().then(() => {
          if(this.platform.is("android")){
              NativeStorage.getItem('userdetails')
            .then(
              data => { resolve(data) },
              error => resolve('error')
            );
          }else{
            if(localStorage.getItem('userdetails') == null){
              resolve('error');
            }else{
              resolve(JSON.parse(localStorage.getItem('userdetails')));
            }
          }
    });
  });
  }
}
