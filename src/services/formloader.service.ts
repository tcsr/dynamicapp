import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { environment } from '../config/environment';
import { FormValidationService } from './form-validation.service'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FormLoaderService {
    private environmentMap = environment;
    private environmentUrl;

    constructor( private _http: Http, private fb: FormBuilder, private _formvalidationService: FormValidationService ) { }

    getForm( formCode: string, formVersionCode: string, formSubCode: string, envName: string, userToken: string ) {
        this.environmentUrl = this.environmentMap[envName];
        let headers = new Headers();
        if(window.navigator.userAgent.search(/MSIE|Trident/i) != -1){
            headers.append('Cache-Control','no-cache');
            headers.append('Cache-Control','no-store');
            headers.append('Pragma','no-cache');
        }
        if ( userToken ) {
            headers.append( 'Authorization', "Bearer " + userToken );
        }
        if ( formSubCode ) {
            return this._http.get( `${this.environmentUrl}/formSubmission/submissionCode/${formSubCode}`, { headers: headers }).map( res => res.json() ).catch( this.handleError );
        } else {
            if ( !formVersionCode ) {
                return this._http.get( `${this.environmentUrl}/form/formCode/${formCode}`, { headers: headers }).map( res => res.json() ).catch( this.handleError );
            } else {
                return this._http.get( `${this.environmentUrl}/form/formCode/${formCode}/formVersion/${formVersionCode}`, { headers: headers }).map( res => res.json() ).catch( this.handleError );
            }
        }
    }

    private handleError( error: any ) {
        let errMsg: any = {};
        if ( error ) {
            errMsg["status"] = error.status;
            errMsg["statusText"] = error.statusText;
            errMsg["url"] = error.url;
        } else {
            errMsg["message"] = error.message ? error.message : error.toString();
        }
        return Observable.throw( errMsg );
    }

    postForm( formPostData: any, envName: string, userToken: any ) {        
        this.environmentUrl = this.environmentMap[envName];        
        var jsonPostBody = JSON.stringify( formPostData );        
        var headers = new Headers();
        if ( userToken ) {
            headers.append( 'Authorization', "Bearer " + userToken );
        }
        headers.append( 'Content-Type', 'application/json' );
        return this._http.post( `${this.environmentUrl}/formSubmission`, jsonPostBody, { headers: headers })
            .map( res => res.json() );
    }

    putForm( formPostData: any, envName: string, formSubmissionCode: any, userToken: any ) {
        this.environmentUrl = this.environmentMap[envName];
        var jsonPostBody = JSON.stringify( formPostData );
        var headers = new Headers();
        if ( userToken ) {
            headers.append( 'Authorization', "Bearer " + userToken );
        }
        headers.append( 'Content-Type', 'application/json' );
        return this._http.put( `${this.environmentUrl}/formSubmission/${formSubmissionCode}`, jsonPostBody, { headers: headers });
    }

    buildForm( data ) {
        let form = this.fb.group( {});
        form = this.fb.group( {
            formCode: data.formCode,
            formVersionCode: data.formVersionCode,
            complete: true,
            formSections: this.fb.array( this.buildFormSections( data.formSections ) )
        });
        return form;
    }

    buildFormSections( sections ) {
        let sectionsArray = [];
        sections.forEach( section => {
            let group = {
                responses: this.fb.array( this.buildSectionQuestions( section.questions ) )
            }
            sectionsArray.push( this.fb.group( group ) );
        })        
        return sectionsArray;
    }

    buildSectionQuestions( questions ) {
        let questionsArray = [];
        questions.forEach( question => {
            let group: any = {
                questionSequenceCode: question.questionSequenceCode,
                iterations: this.fb.array(this.buildIterations( question ))
            };
            questionsArray.push( this.fb.group( group ) );
        })
        return questionsArray;
    }

    buildIterations( question ) {
        let iterationsArray = [];        
        question.iterations.forEach( (iteration,index) => {
            index = index + 1;
            let group = {
                iteration: index,
                response: this._formvalidationService.buildFormControl( question )
            }
            if ( question.type !== "text" && question.type !== "textarea" && question.type !== "date" && question.type !== "info" ) {
                group['responseMetadata'] = {
                    allowedResponses: this.fb.array( this.buildAllowedResponses( iteration ) ).value,
                    chosenResponses: this.fb.array( [] ).value
                }
            }
            iterationsArray.push( this.fb.group( group ) );
        })
        return iterationsArray;
    }

    buildAllowedResponses( question ) {        
        let allowedOptionsArray = [];        
            if (question.allowedOptions && question.allowedOptions.length > 0){
                question.allowedOptions.forEach( item => {
                    let group = {
                            display:item.display,
                            value:item.value
                        };
                    allowedOptionsArray.push(this.fb.group( group ));
                });
            }
        return allowedOptionsArray;        
    }
}


