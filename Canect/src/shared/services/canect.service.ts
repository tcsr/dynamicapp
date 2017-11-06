import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CanectService {

  constructor(private _http: Http) { }

  getData(url): Observable<any> {
    return this._http.get(url).map(
      (res) => {
        const data = res.json();
        return data;
      }
    )
  }

}
