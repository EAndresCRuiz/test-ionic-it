import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-app',
  templateUrl: './detalle-app.page.html',
  styleUrls: ['./detalle-app.page.scss'],
})
export class DetalleAppPage implements OnInit {

  public data: any;

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.selectedApp;
      }
    });
  }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

}
