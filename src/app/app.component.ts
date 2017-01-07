import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { DataCenter } from '../providers/data-center';
import { login } from '../pages/login/login';
import { CalculatorPage } from '../pages/calculator/calculator';


@Component({
    templateUrl: 'app.html',
    providers : [DataCenter]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, dc : DataCenter) {
        this.initializeApp();
        dc.getUserDetails().then(data => {
            console.log(data);
            if(data =='error'){
                this.rootPage = CalculatorPage;
                this.pages = [
                    { title: 'EMI Calculator', component: CalculatorPage },
                    { title: 'Login', component: login }
                ];
            }else{
                this.rootPage = Page1;
                this.pages = [
                    { title: 'Home', component: Page1 },
                    { title: 'Chat', component: Page2 },
                    { title: 'EMI Calculator', component: CalculatorPage },
                    { title: 'Settings', component: Page3 }
                ];
            }
        });

        // used for an example of ngFor and navigation


    }

    initializeApp() {
        this.platform.ready().then(() => {
            if(this.platform.is("android")){
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                StatusBar.styleDefault();
                Splashscreen.hide();
            }
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
