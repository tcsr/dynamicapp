import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SearchComponentService } from './../../../services/index';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';
import { MODE } from '../../../config/globals.ts';

//Search Component
@Component( {
    selector: 'search-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="(isSubmitClicked && !control?.valid) || (control?.errors?.Required && !control.readOnly)" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3,'col-md-3 inline-padding': questiondata.params.inline == 4}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                   <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order"></label-text>
                     <div [ngClass]="{'show-list' : !questiondata.params.inline}">
                         <table>
                          <tr *ngFor="let item of selected">
                             <td [class.fixed-width]='!control.readOnly'>{{item.display}}</td>
                             <td><a (click)="remove(item)" *ngIf=" mode=='edit' || mode=='amend'"><i class="glyphicon glyphicon-remove"></i></a></td>
                          </tr>
                          <tr *ngFor="let allowedResponse of questiondata.responseMetadata?.allowedOptions">
                             <td *ngIf="control.readOnly" [class.fixed-width]='control.readOnly'>{{allowedResponse.display}}</td>
                          </tr>
                         </table>
                      </div>

                       <div [ngClass]="{'search' : !questiondata.params.inline}">
                        <input class="form-control"
                              [(ngModel)]="selectedName"
                              [typeahead]="dataSource"
                              (typeaheadNoResults)="changeTypeaheadNoResults($event)"
                              (typeaheadOnSelect)="typeaheadOnSelect($event)"
                              [typeaheadOptionsLimit]="10"
                              [typeaheadOptionField]="'display'"
                              [typeaheadWaitMs]='300'
                              [typeaheadMinLength]="2"
                              placeholder="{{placeHolder}}"
                              *ngIf= "!disableButton" [disabled]="control.readOnly" (blur)="clearInput()" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' " [attr.id]="sectionId+'_'+questiondata.order" >
                          </div>
                       <div class="validation-text">
                        <span *ngIf="typeaheadNoResults" > No results found. </span>
                        <span *ngIf="duplicateResult"> Duplicate entries. </span>
                       </div>
                      <errorMessages *ngIf="!control.readOnly && !typeaheadNoResults" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                      <span *ngIf="errorMessage.status==0 && !control.readOnly && !typeaheadNoResults " class="text-danger">No search results found</span>                      <br/>  
                  </div> <br *ngIf="!questiondata.params.inline" />
                   `
})

export class SearchComponent {
    @Input() questiondata: any;
    @Input() form: any;
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() controlObject: any;
    @Input() mode: string;

    searchResults: Array<any> = [];
    dataSource: Observable<any>;
    selectedName: string = '';
    searchApi = "";
    selected = [];
    selectedValues=[];
    typeaheadNoResults: boolean = false;
    disableButton: boolean = false;
    duplicateResult: boolean = false;
    maxIterations = 1;
    private response = [];
    private errorMessage: any = {};
    private defaultPlaceHolder: string = 'Search';
    private placeHolder: string = '';
    searchSubscription: Subscription;

    constructor( private _searchComponentService: SearchComponentService, private fb: FormBuilder ) {
        this.dataSource = Observable.create(( observer: any ) => {
            observer.next( this.selectedName );
        }).mergeMap(( token: string ) => this.getSearchNameAsObservable( token ) );
    }

    ngOnInit() {
        this.placeHolder = ( this.questiondata.params.placeHolder ? this.questiondata.params.placeHolder : this.defaultPlaceHolder );
        if ( this.control.readOnly ) {
            this.control = new FormControl( '' );
            this.control["readOnly"] = true;
            this.selectedResponses();
            if(this.selected[this.selected.length-1]){
                this.response.push(this.selected[this.selected.length-1].value);
            }
            this.selected.length == 0 ? this.control.setValue( "" ) : this.control.setValue(this.selectedValues[0]);
            this.disableButton = true;
            this.control.disable( true );
        }
        else {
            this.control.enable( true );
            this.control["readOnly"] = false;
            this.selectedResponses();  
            this.updateIteration();
           
            if ( this.questiondata.params.maxIterations ) {
                this.maxIterations = this.questiondata.params.maxIterations;
            }
            if ( this.selected.length < this.maxIterations ) {
                this.disableButton = false;
            } else {
                this.disableButton = true;
            }
        }
    }
    selectedResponses(){
        if ( this.questiondata.iterations) {
            this.questiondata.iterations.forEach( iteration => {
              if(iteration.responseMetadata){
                  let chosenResponses=iteration.responseMetadata.chosenResponses;
                  if(chosenResponses){
                      chosenResponses.forEach((item)=>{
                          let index=iteration.iterationNumber-1;
                          this.selected.push(item);
                          this.selectedValues.push(item.value);
                          if(this.controlObject.controls)
                          this.controlObject.controls.iterations.controls[index].controls.response.setValue(item.value);
                      });
                  }   
              }  
            });
        }
    }
    
    typeaheadOnSelect( e: TypeaheadMatch ): void {
        if ( this.selectedValues.indexOf( e['item'].value ) == -1 ) {
            if ( this.questiondata.params.maxIterations ) {
                this.maxIterations = this.questiondata.params.maxIterations;
            }
            if ( this.selected.length < this.maxIterations ) {
                this.selected.push( e['item'] );
                this.selectedValues.push(e['item'].value);
                this.duplicateResult = false;
            }
            if ( this.selected.length < this.maxIterations ) {
                this.disableButton = false;
            } else {
                this.disableButton = true;
            }
            this.response.push(this.selected[this.selected.length-1].value);
            this.selectedName = '';
        } else {
            this.selectedName = '';
            this.duplicateResult = true;
        }
        this.selected.length == 0 ? this.control.setValue( "" ) : this.control.setValue(this.response[0]);
        this.updateIteration();
        this.errorMessage = {};        
    }

    clearInput() {
        this.selectedName = '';
        this.duplicateResult = false;
        this.typeaheadNoResults = false;
    }

    remove( item ) {        
        this.selected.splice( this.selected.indexOf( item ), 1 );
        this.selectedValues.splice( this.selectedValues.indexOf( item.value ), 1 );
        if ( this.questiondata.params.maxIterations ) {
            this.maxIterations = this.questiondata.params.maxIterations;
        }
        if ( this.selected.length < this.maxIterations ) {
            this.disableButton = false;
        }
        this.selected.length == 0 ? this.control.setValue( "" ) : this.control.setValue(this.selected[0]);
        this.updateIteration();        
        this.duplicateResult = false;
    }
    getSearchNameAsObservable( token: string ): Observable<any> {
        this.searchApi = this.questiondata.params.searchApi;
        return Observable.create(( observer: any ) => {
            if ( token.length >= 2 ) {
                this._searchComponentService.getSearchNames( this.selectedValues, this.searchApi, token ).subscribe(( data: any ) => {
                    observer.next( data );
                }, error => {
                    this.errorMessage = error;
                    this.control.setErrors( null );
                });
            }
        });
    }

    changeTypeaheadNoResults( e: boolean ): void {
        this.typeaheadNoResults = e;
    }
    updateIteration(){   
    let iterations= [];
       if(this.selected){          
            this.selected.forEach((elem,index) =>{          
                iterations.push({
                    iteration: index + 1,
                    response: elem.value,
                    responseMetadata:{
                        allowedResponses:[],
                        chosenResponses:[elem]
                    }
            });
            });  
        }   
        if(this.selected.length == 0){
            iterations.push({
                iteration:0,
                response:"",
                responseMetadata:{
                    allowedResponses:[],
                    chosenResponses:[]
                }
            });
        }
        this.controlObject.value.iterations = iterations;       
    }
}