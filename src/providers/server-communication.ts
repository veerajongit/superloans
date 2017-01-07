import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServerCommunication provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServerCommunication {
  servername : string;
  constructor(public http: Http) {
    this.servername = "http://128.199.84.250/superloans_php/";
    console.log('Hello ServerCommunication Provider');
  }

}
