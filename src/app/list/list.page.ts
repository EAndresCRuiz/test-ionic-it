import { Component, OnInit } from '@angular/core';
import { AppsService } from '../api/apps.service';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public applications = [];
  
  constructor(public api: AppsService, public storage: Storage, public router: Router, 
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log("if");
        this.applications = this.router.getCurrentNavigation().extras.state.selectedApps;
        console.log("if", this.applications);
      }else{
        console.log("else");
        this.listar();
      }
    });
  }

  ngOnInit() {

    //this.listar();

  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  listar(){
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }


    this.storage.get('appsData')
      .then((data:any) => {

        this.applications = [];

        if(data){
          
          this.applications = data['feed']['entry'];

        }else{
          
          this.api.getinfoApps()
            .then(resp => {        

              console.log("info",resp);
              this.storage.set('appsData', resp);

              this.applications = data['feed']['entry'];

            })
            .catch(err => {

            });

        }

        
      });

  }

  selectApp(id){

    let selectedApp = {};

    this.applications.forEach(app => {
      if (app.id.attributes['im:id']==id.attributes['im:id']) {
        console.log("encontrado",app);
        selectedApp = app;
      }
    });

    let navigationExtras: NavigationExtras = {
      state: {
        selectedApp: selectedApp,
        listApps: this.applications
      }
    };

    this.router.navigate(['detalle-app'], navigationExtras);
    // this.navCtrl.navigateForward((DetalleAppPage, {medico: "medico", productos: "result", 
    //   visita: "visitajson", offline: "dataOff"});
  }

}
