import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LibraryTokenAuthService } from "./library-tokenauth.service"

@Injectable()
export class SearchComponentService {
    private searchUrl:string="";
    private userToken:string = "";
    constructor(private _http: Http,private _libraryTokenAuthService:LibraryTokenAuthService) {
        this.searchUrl = "";
         }

    getSearchNames(selected: any, searchApi: string, searchName: string) {
        let headers = new Headers();
        if(window.navigator.userAgent.search(/MSIE|Trident/i) != -1){
        	headers.append('Cache-Control','no-cache');
        	headers.append('Cache-Control','no-store');
        	headers.append('Pragma','no-cache');
        }        
        this.searchUrl = `${searchApi}/${searchName}`;
        this.userToken = this._libraryTokenAuthService.getToken();
        if (this.userToken) {
            headers.append('Authorization', "Bearer " + this.userToken);
        }
        return this._http.get(`${searchApi}/${searchName}`, {
                headers: headers
            })
            .map(res => {
                let results = res.json().options;
                return results.filter((element) => {
                    let isCancelled = false;
                    if (selected.indexOf(element.value) == -1) {
                        isCancelled = true;
                    }
                    return isCancelled;
                });
            }).catch((error) => {
                let errMsg: any = {};
                if (error) {
                	errMsg["status"] = error.status ? error.status : 0 ;
                    errMsg["statusText"] = error.statusText;
                    errMsg["url"] = this.getSearchURL();
                } else {
                    errMsg["message"] = error.message ? error.message : error.toString();
                }
                return Observable.throw(errMsg);
            });
    }

    getSearchURL():string{
        return this.searchUrl;
        }
}


