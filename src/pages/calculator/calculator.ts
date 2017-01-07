import { Component } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { NavController } from 'ionic-angular';
/*
  Generated class for the Calculator page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html'
})
export class CalculatorPage {

  lamount;
  iamount;
  ltenure;
  html;
  dataset = [];
  noofpayments;
  EMI;
  constructor(public navCtrl: NavController, public http : Http) {
    this.lamount = 100000;
    this.iamount = 10.5;
    this.ltenure = 5;
    this.html = '';
  }

  calculatemonthly(){
    let ds = this.getDataSet(12);
    this.dataset = [];
    for (let i = 0; i < this.noofpayments; i++){
      this.dataset[i] = ds[i];
    }
    this.EMI = parseFloat(this.dataset[0][1] + this.dataset[0][2]).toFixed(2);
  }

  calculateyearly(){
    let ds = this.getDataSet(1);
    this.dataset = [];
    for (let i = 0; i < this.noofpayments; i++){
      this.dataset[i] = ds[i];
    }
    this.EMI = parseFloat(this.dataset[0][1] + this.dataset[0][2]).toFixed(2);
  }

  pmt(rate,nper,pv) {
    var pvif, pmt;

    pvif = Math.pow( 1 + rate, nper);
    pmt = rate / (pvif - 1) * -(pv * pvif);

    return pmt;
  };
  computeSchedule(loan_amount, interest_rate, payments_per_year, years, payment) {
    var schedule = [];
    var remaining = loan_amount;
    var number_of_payments = payments_per_year * years;
    this.noofpayments = number_of_payments;
    for (var i=0; i<=number_of_payments; i++) {
      var interest = remaining * (interest_rate/100/payments_per_year);
      var principle = (payment-interest);
      var row = [i, principle>0?(principle<payment?principle:payment):0, interest>0?interest:0, remaining>0?remaining:0];
      schedule.push(row);
      remaining -= principle
    }

    return schedule;
  }
  getDataSet(paymentsPerYear) {
    let loanAmount = this.lamount;
    let interestRate = this.iamount;
    let years = this.ltenure;
    let numberOfPayments = paymentsPerYear * years;

    let payment = this.pmt(interestRate/100/paymentsPerYear, numberOfPayments, -loanAmount);

    return this.computeSchedule( loanAmount,
        interestRate,
        paymentsPerYear,
        years,
        payment );
  }

}
