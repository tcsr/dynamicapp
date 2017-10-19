import { Injectable } from '@angular/core';
import { TOKEN_COOKIE } from '../config/globals';
@Injectable()
export class LibraryTokenAuthService {
    getToken() {
        let tokenEnvironments:any = Object.keys(TOKEN_COOKIE);
        var tokenVal = '';
        if (document.cookie) {
            var cookieArray = document.cookie.split(';');
            for (let idx = 0; idx < cookieArray.length; idx++) {
                var cookieKeyVal = cookieArray[idx].split('=');
                for (let j = 0; j < tokenEnvironments.length; j++)
                    if (cookieKeyVal[0].toLowerCase().trim() == TOKEN_COOKIE[tokenEnvironments[j]]) {                        
                        tokenVal = cookieKeyVal[1];
                    }
            }
        }
        return tokenVal;
    }

}