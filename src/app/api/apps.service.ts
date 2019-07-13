import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { apiUrl } from 'src/commons/Constants';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  apiUrl:string = apiUrl;

  constructor(public http: HttpClient) { }

  getInfoApi(Observable){
    
    return new Promise(resolve => { Observable.subscribe(
        data => {
          resolve( data );
        },
        err => {
          console.log("Error occured.");
          console.log(err);
          reject( err );
        }
      );
    })

  }

  getinfoApps(){
    return this.getInfoApi(this.http.get(this.apiUrl));
  }

}
