import { Component } from '@angular/core';
import { AppsService } from '../api/apps.service';
import { Storage } from '@ionic/storage';
import { inArray } from 'src/commons/Utils';

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
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public api: AppsService, public storage: Storage) {
    
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
        
        data['feed']['entry'].forEach(app => {
          //console.log("info",app);
          if (!inArray(app.category.attributes.label, itemsadded)) {
            this.items.push({
              title: app.category.attributes.label,
              note: app.category.attributes.term,
              icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
            itemsadded.push(app.category.attributes.label);
          }
          
        });

      }else{
        
        this.api.getinfoApps()
          .then(resp => {        

            console.log("info",resp);
            this.storage.set('appsData', resp);

            resp['feed']['entry'].forEach(app => {
              
              if (!inArray(app.category.attributes.label, itemsadded)) {
                this.items.push({
                  title: app.category.attributes.label,
                  note: app.category.attributes.term,
                  icon: this.icons[Math.floor(Math.random() * this.icons.length)]
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

}
