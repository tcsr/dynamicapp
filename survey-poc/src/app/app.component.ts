import { Component, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UcHeaderComponent } from './index';
import { environment } from '../environments/environment';
import { TokenAuthService } from './tokenauth.service';
import { MODE,FORM_STATUS } from './config/globals.ts';

@Component({
  selector: 'survey-app',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./assets/css/project.scss']
})
export class AppComponent{
    constructor(private _tokenAuthService:TokenAuthService){
        if(environment.ENV == 'prod' || environment.ENV == 'stage' ||  environment.ENV == 'dev'){
            _tokenAuthService.authenticate();
        }
    }
}

@Component({
  selector: 'form-load',
  template: '<questionnaire-form (isFormSubmitted)="isFormSubmitted($event)" (isFormError)="isFormError($event)" [formCode]="formCode" [formVerCode]="formVerCode" [formSubCode]="formSubCode" [envName]="envName" [mode]="mode" [enableSave]="true"></questionnaire-form>'
})
export class AppLoadComponent{
    formCode: string = "";
    formVerCode: string = "";
    formSubCode: string = "";
    mode: string = "";
    private _token:any = null;
    public envName: any = environment.ENV;

    constructor(private router:Router, private route: ActivatedRoute, private _tokenAuthService:TokenAuthService){
        this.route.params.forEach((params: Params) => {
            this.formCode = params['formCode'];
            this.formVerCode = params['formVerCode'];
            this.formSubCode = params['formSubCode'];
        })
        if(this.route.snapshot.data["mode"] == MODE.READONLY) {
            this.mode = MODE.READONLY;
        } else if (this.route.snapshot.data["mode"] == MODE.AMEND){
            this.mode = MODE.AMEND;
        } else {
            this.mode = MODE.EDIT;
        }

        var map = {
            "BAU":"1a2b3c4d-1a2b-1a2b-1a2b-a1a2b3c4d5e3",
            "LHA":"1a2b3c4d-1a2b-1a2b-1a2b-a1a2b3c4d5e2",
            "TEST":"90f40712-4566-11e6-9e43-b87a3dc21523",
            "VIEWTEST":"3a63f55f-0f0f-4bd3-8850-2511c6e50aec",
            "VIEWLHA":"bbcd8ea2-1f5e-4b88-943d-3447e00ca031",
            "VIEWBUA":"aff988a9-36ad-4464-a57e-2848afaea140"
        }

        if(map[this.formCode]){
            this.formCode = map[this.formCode];
        }
        if(map[this.formSubCode]){
            this.formSubCode = map[this.formSubCode];
        }
    }

    isFormSubmitted( data: any ) {
        if ( data.status == FORM_STATUS.SUBMITTED ) {
            this.router.navigate( ['/confirm', data.submissionCode] );
        }
    }
    isFormError( data: any ) {
        let errorMsg = typeof data.errorMessage == "object" ? data.errorMessage.url : data.errorMessage;
        if ( data.status == FORM_STATUS.ERROR ) {
            this.router.navigate( ['/error', errorMsg] );
        }
}

}

@Component({
  selector: 'menu',
  styleUrls: ['./assets/css/project.scss'],
  template: ` <div class="panel panel-default">
                <div class="panel-body menupanel-body" style="font-size: 17px;">
                    <H1 class="text-left home-font"><b>Take Survey</b></H1>
                    <ul>
                        <li><a [routerLink]="['takeSurvey/TEST']">Test Form</a></li>
                        <li><a [routerLink]="['takeSurvey/LHA']">Laboratory Hazard Assessment Form</a></li>
                        <li><a [routerLink]="['takeSurvey/BAU']">Biological Use Authorization Form</a></li>
                    </ul>
                    <H1 class="text-left home-font"><b>View Survey</b></H1>
                    <ul>
                        <li><a [routerLink]="['viewSurvey/VIEWTEST']">Test Form</a></li>
                        <li><a [routerLink]="['viewSurvey/VIEWLHA']">Laboratory Hazard Assessment Form</a></li>
                        <li><a [routerLink]="['viewSurvey/VIEWBUA']">Biological Use Authorization Form</a></li>
                    </ul>
                </div>
            </div>`
})

export class MenuComponent{

}
