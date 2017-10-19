
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class TokenAuthService {
    private _token: any = null;
    private name: any = environment.tokenName;
    public envURL: any = environment.URL;

    authenticate() {
        this._token = this.getTokenCookie(document.cookie, this.name);
        if (!this._token) {
            this.redirect();
        }
    }

    redirect() {
        window.location.href = this.envURL;
    }

  getTokenCookie(cookie: any, name: any){

    var tokenVal = '';
    if(cookie){
      var cookieArray = cookie.split(';');
      for(let idx=0; idx < cookieArray.length; idx++) {
        var cookieKeyVal = cookieArray[idx].split('=');
        if(cookieKeyVal[0].toLowerCase()==name) {
          tokenVal = cookieKeyVal[1];
        }
      }
    }

    return tokenVal;
  }
}
