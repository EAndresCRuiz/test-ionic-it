import { Component } from '@angular/core';
import { AppsService } from '../api/apps.service';
import { Storage } from '@ionic/storage';
import { inArray } from 'src/commons/Utils';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{id: string, title: string; note: string; icon: string }> = [];
  public applications = [];

  constructor(public api: AppsService, public storage: Storage, public router: Router) {
    
  }

  ngOnInit() {

    this.listar();

  }

  listar(){

    this.storage.get('appsData')
    .then((data:any) => {

      this.items = [];
      let itemsadded = [];

      if(data){
        
        this.applications = data['feed']['entry'];

        data['feed']['entry'].forEach(app => {
          //console.log("info",app);
          if (!inArray(app.category.attributes.label, itemsadded)) {
            this.items.push({
              id: app.category.attributes['im:id'],
              title: app.category.attributes.label,
              note: app.category.attributes.term,
              icon: this.selectIcon(app.category.attributes.label)
            });
            itemsadded.push(app.category.attributes.label);
          }
          
        });

      }else{
        
        this.api.getinfoApps()
          .then(resp => {        

            console.log("info",resp);
            this.storage.set('appsData', resp);
            this.applications = resp['feed']['entry'];

            resp['feed']['entry'].forEach(app => {
              
              if (!inArray(app.category.attributes.label, itemsadded)) {
                this.items.push({
                  id: app.category.attributes['im:id'],
                  title: app.category.attributes.label,
                  note: app.category.attributes.term,
                  icon: this.selectIcon(app.category.attributes.label)
                });
                itemsadded.push(app.category.attributes.label);
              }

            });

          })
          .catch(err => {

          });

      }

      
    });

  }

  selectIcon(name: string){
    switch (name) {
      case 'Social Networking':
        return "people";
      case 'Games':
        return "football";        
      case 'Photo & Video':
        return "camera";        
      case 'Productivity':
        return "calculator";        
      case 'Navigation':
        return "map";        
      case 'Finance':
        return "briefcase";        
      case 'Food & Drink':
        return "restaurant";        
      case 'Shopping':
        return "pricetags";        
    }
  }

  filterApps(id){
    
    let selectedApps = [];

    this.applications.forEach(app => {
      if (app.category.attributes['im:id']==id) {
        console.log("encontrado",app);
        selectedApps.push( app );
      }
    });

    let navigationExtras: NavigationExtras = {
      state: {
        selectedApps: selectedApps
      }
    };

    this.router.navigate(['list'], navigationExtras);
  }

}
