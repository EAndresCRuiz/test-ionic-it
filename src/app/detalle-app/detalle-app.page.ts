import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-detalle-app',
  templateUrl: './detalle-app.page.html',
  styleUrls: ['./detalle-app.page.scss'],
})
export class DetalleAppPage implements OnInit {

  public data: any;
  public dataParent: any;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.selectedApp;
        this.dataParent = this.router.getCurrentNavigation().extras.state.listApps;
      }
    });
  }

  ngOnInit() {
  }

  goBack(){

    if (this.dataParent) {
      let selectedApps = [];

      let navigationExtras: NavigationExtras = {
        state: {
          selectedApps: this.dataParent
        }
      };
      console.log("todos filters ", selectedApps);

      this.router.navigate(['list'], navigationExtras);
    }else{
      this.navCtrl.back();
    }
    
  }

}
