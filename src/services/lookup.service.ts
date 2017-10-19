import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LibraryTokenAuthService } from "./library-tokenauth.service"

@Injectable()
export class LookupService { 
    private lookupURL:string = "";
    private userToken:string = "";       
    constructor(private _http: Http,private _libraryTokenAuthService:LibraryTokenAuthService) { }
    getLookup(lookupApi: string){
    	let headers = new Headers();
    	if(window.navigator.userAgent.search(/MSIE|Trident/i) != -1){
        	headers.append('Cache-Control','no-cache');
        	headers.append('Cache-Control','no-store');
        	headers.append('Pragma','no-cache');
        }
        this.lookupURL = lookupApi;
        this.userToken = this._libraryTokenAuthService.getToken();
        if(this.userToken){
            headers.append('Authorization', "Bearer "+this.userToken);
        } 
        return this._http.get(lookupApi, { headers: headers })
        .map(res => res.json())
        .catch((error) =>{
            let errMsg:any = {};
      if (error) {
    	errMsg["status"] = error.status ? error.status : 0 ;
        errMsg["statusText"] = error.statusText;
        errMsg["url"] = this.getLookupURL();          
      } else {
        errMsg["message"] = error.message ? error.message : error.toString();
      }
         console.log(errMsg);
        return Observable.throw(errMsg);              
        });
    }
    getLookupBasedOnSearch(lookupApi: string,searchName: string){
        let results = [];
        return this._http.get(`${lookupApi}`).map(res => {
          results = res.json().options;
            return results[searchName];
          });
    }
    
    getLookupURL() {
        return this.lookupURL;
        }
}
