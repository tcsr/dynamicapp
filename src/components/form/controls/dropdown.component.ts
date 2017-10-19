
import { Component, Input, OnInit } from '@angular/core';
import { LookupService, FormValidationService } from './../../../services/index';
import { Subscription } from 'rxjs/Subscription';

//DropdownboxComponent
@Component( {
    selector: 'dropdown-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="(isSubmitClicked && !control?.valid) || (control?.errors?.Required && !control.readOnly)" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                              <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order+'_'+order+'_dropdown'"></label-text>
                                <div>
                                    <select class="form-control" role="menu" value="{{response}}" [(ngModel)]="response" [formControl]="control" [attr.id]="sectionId+'_'+questiondata.order+'_'+order+'_dropdown'" (change)="onChange($event)" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' " >
                                        <option value="" [attr.selected]>Select</option>
                                        <option *ngFor="let option of options; let i=index" [attr.value]="option.value">{{option.display}}</option>
                                    </select>
                                     <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                                     <span *ngIf="errorMessage.status==0 && !control.readOnly" class="text-danger">An error occured</span>
                                </div>
                         <br/>
                  </div> <br *ngIf="!questiondata.params.inline" />
                 `
})

export class DropdownComponent implements OnInit {
    @Input() questiondata: any;
    @Input() controlObject: any;
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() mode;

    private response = "";
    private lookup = {};
    private errorMessage = {};
    private options = [];
    private selectedDropdownValue = "";

    lookUpSubscription: Subscription;

    constructor( private _lookupService: LookupService, private _formValidationService: FormValidationService ) { }
    ngOnInit() {
        if ( this.control.readOnly ) {
            this.control.disable( true );
        }
        if ( this.questiondata.iterations ) {
            if ( this.questiondata.iterations[0].responseMetadata){
                if ( this.questiondata.iterations[0].responseMetadata.chosenResponses )
                    this.selectedDropdownValue = this.questiondata.iterations[0].responseMetadata.chosenResponses[0].value;
            }
        }
       
        let lookupApi = this.questiondata.params.lookupApi;
        if ( lookupApi ) {
            this.response = "";
            if ( this.questiondata.params.lookupApiDependencyCode ) {
                let parentControl = this._formValidationService.getQuestionControl( this.questiondata.params.lookupApiDependencyCode );
                parentControl.valueChanges.subscribe( response => {
                    if ( response ) {
                        this.lookUpSubscription = this._lookupService.getLookupBasedOnSearch( lookupApi, response ).subscribe( data => {
                            if ( data ) {
                                this.options = data;
                                this.updateIterations( this.selectedDropdownValue );
                            } else {
                                this.options = [];
                                this.updateIterations( "" );
                            }
                        });
                    } else {
                        this.options = [];
                        this.updateIterations( "" );
                        this.selectedDropdownValue = "";
                    }
                },
                    error => this.errorMessage = <any>error );
            } else {
                this.lookUpSubscription = this._lookupService.getLookup( lookupApi ).subscribe( data => {
                    this.options = data["options"];
                    this.updateIterations( this.selectedDropdownValue );
                },
                    error => this.errorMessage = <any>error );
            }
        }
        else {
            let allowedOptionsArray = this.questiondata.allowedOptions;
            this.options = allowedOptionsArray;
            this.response = this.questiondata.iterations[0].responseText;
            this.updateIterations( this.questiondata.iterations[0].responseText );
        }
    }
    onChange( event ) {
        this.updateIterations( event.target.value );
    }
    updateIterations( value ) {
        this.response = value;
        this.selectedDropdownValue = "";
        this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.chosenResponses.length = 0;
        if ( value ) {
            this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.chosenResponses.push( this.options.filter( function( element ) {
                let matchFound = false;
                if ( element.value == value ) {
                    matchFound = true;
                }
                return matchFound;
            })[0] );
            this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.allowedResponses = this.options;
        }else{
            this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.allowedResponses = [];
        }
    }
}



