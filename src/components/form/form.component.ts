import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormSectionComponent} from './formsection.component';
import {FormLoaderService, FormValidationService} from './../../services/index';
import { FormGroup } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { LibraryTokenAuthService } from './../../services/library-tokenauth.service';
import { FORM_STATUS,MODE } from '../../config/globals.ts';

@Component({
  selector: 'questionnaire-form',
  templateUrl:'form.component.html',
  styleUrls: ['form.scss']
})

export class FormComponent implements OnInit,OnDestroy{
    @Input('formCode') formCode:string;
    @Input('formVerCode') formVerCode: string;
    @Input('formSubCode') formSubCode: string;
    @Input('envName') envName: string;
    @Input('mode') mode: string;
    @Input('enableSave') enableSave: boolean;

    @Output() isFormSubmitted:any = new EventEmitter<any>();
    @Output() isFormSaved:any = new EventEmitter<any>();
    @Output() isFormError: any = new EventEmitter<any>();
    @Output() isFormCancelled: any = new EventEmitter<any>();
    @Output() isFormLoading: any = new EventEmitter<any>();
    @Output() isFormLoaded: any = new EventEmitter<any>();
    
    private form: FormGroup = new FormGroup({});
    private disableButton: boolean = false;
    private isSubmitClicked = false;
    private isFormDisabled: any = null;
    private survey: any;
    private errorMessage: string = '';
    private formErrorMessage={};
    private complete: boolean = false;
    private isSaveEnabled: boolean = false;
    private formSubmissionCode:any;
    private saveMessage: string = '';
    private requiredFieldStatement: string = 'Required fields are marked by an asterisk (*)';
    private SUBMISSION_ERROR_MESSAGE: string = '* An error has occurred. Please try again.';
    private XSS_INJECTION_ERROR:string = 'Kindly provide valid data.';
    private VALIDATION_ERROR_MESSAGE: string = '* Missing/invalid answers. Please check your answers.';
    private SAVE_MESSAGE: string = 'Your form has been successfully saved.';
    private EMPTY_SAVE_MESSAGE: string = 'Sorry , empty form can not be saved.';
    
    formSubscription;

    constructor(private _formLoaderService:FormLoaderService, private _formvalidationService:FormValidationService,private _libraryTokenAuthService:LibraryTokenAuthService){
    }

    ngOnInit(){
          this.isFormLoading.emit(this.statusChange(FORM_STATUS.LOADING,'',''));
          if(this.mode == MODE.EDIT || this.mode == MODE.READONLY){
              this.formSubmissionCode = this.formSubCode;
          }          
          this.formSubscription = this._formLoaderService.getForm(this.formCode, this.formVerCode, this.formSubCode, this.envName, this._libraryTokenAuthService.getToken()).subscribe(data => {
          this.survey = data;
          
          let isCompleted = this.survey.complete;
          if(this.formSubmissionCode  && isCompleted==true && this.mode == MODE.EDIT){
              this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',''));
          } 
          
          if(this.formSubmissionCode  && isCompleted==false && this.mode == MODE.READONLY){
              this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',''));
          } 
          
          if(this.formSubmissionCode  && isCompleted==false && this.mode == MODE.AMEND){
              this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',''));
          } 
          
          if(!this.formSubmissionCode  && isCompleted==false && this.mode == MODE.READONLY){
              this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',''));
          } 
          
          if(!this.formSubmissionCode  && isCompleted==false && this.mode == MODE.AMEND){
              this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',''));
          } 
          
          this.form = this._formLoaderService.buildForm(data) 
          this.form.valueChanges.subscribe(data => {if (this.form.valid)this.errorMessage='';});
          this.form.valueChanges.debounceTime(60000).subscribe(data => this.save(this.form));
          this.isFormLoaded.emit(this.statusChange(FORM_STATUS.LOADED,'',''));
          if (this.enableSave) this.isSaveEnabled = true;
       },
         error => { this.formErrorMessage = <any>error.url;
         this.isFormError.emit(this.statusChange(FORM_STATUS.ERROR,'',error));
         });
    }
   
    ngOnDestroy() {
        this.formSubscription.unsubscribe();
    }

    submit(form){
        let submissionCode;
        this.isSubmitClicked = true;
        if (this.form.valid) {
            this.disableButton = true;
            this.isFormDisabled =true;
           if(!this.formSubmissionCode){
            form.value.complete = true;
            this._formLoaderService.postForm(form.value, this.envName,  this._libraryTokenAuthService.getToken()).subscribe(data => {
                submissionCode = data.submissionCode;
                this.disableButton = false;
                this.isFormDisabled = false;
                 if (submissionCode) {
                    this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.SUBMITTED,submissionCode,''));
                } 
                if (this.mode == MODE.EDIT && this.complete == true){
                    this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                    this.saveMessage = '';
                    this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                } if(this.mode == null && this.mode == '') {
                    this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                    this.saveMessage = '';
                    this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                }
            },
                err => {
                    this.disableButton = false;
                    this.isFormDisabled = false;
                    err.status == 400 ? this.errorMessage= this.XSS_INJECTION_ERROR: this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                    this.saveMessage = '';
                    this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',err));
                }
            );
          } else{
              form.value.complete = true;
              this._formLoaderService.putForm(form.value, this.envName,this.formSubmissionCode, this._libraryTokenAuthService.getToken()).subscribe(data => {
                  submissionCode = data;
                  this.disableButton = false;
                  this.isFormDisabled = false;
                  if (submissionCode) {
                      this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.SUBMITTED,this.formSubmissionCode,''));
                  }
                   if(this.mode == MODE.EDIT && this.complete == true){
                    this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                    this.saveMessage = '';
                    this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                  }  else {
                      this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                      this.saveMessage = '';
                      this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                  }
              },
                  err => {
                      this.disableButton = false;
                      this.isFormDisabled = false;
                      err.status == 400 ? this.errorMessage= this.XSS_INJECTION_ERROR: this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                      this.saveMessage = '';
                      this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                  }
              );
            } 
          }
         else {
            this.errorMessage=this.VALIDATION_ERROR_MESSAGE;
            this.saveMessage = '';
            this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
        }     
    }

    save(form){
        let submissionCode;
        if(this.emptyResponseSave(form.value)){
             if(!this.formSubmissionCode){
                 form.value.complete = false;
                 this._formLoaderService.postForm(form.value, this.envName, this._libraryTokenAuthService.getToken()).subscribe(data => {
                     submissionCode = data.submissionCode;
                     this.formSubmissionCode = submissionCode;
                     if(this.formSubmissionCode){
                        this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.SAVED,this.formSubmissionCode,''));
                     }
                     else {
                         this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                         this.saveMessage = '';
                         this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                     }
                  });
               }else{
                   form.value.complete = false;
                  this._formLoaderService.putForm(form.value, this.envName,this.formSubmissionCode, this._libraryTokenAuthService.getToken()).subscribe(data => {
                       submissionCode = data;
                       if(submissionCode){
                         this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.SAVED,submissionCode,''));
                       } 
                       else {
                         this.errorMessage=this.SUBMISSION_ERROR_MESSAGE;
                         this.saveMessage = '';
                         this.isFormSubmitted.emit(this.statusChange(FORM_STATUS.ERROR,'',this.errorMessage));
                     }
                   });
                 } 
             this.saveMessage = this.SAVE_MESSAGE;
        } else {
            this.saveMessage = this.EMPTY_SAVE_MESSAGE;
        }
          this.form.valueChanges.subscribe(data => {if (this.SAVE_MESSAGE)this.saveMessage='';});
          this.errorMessage = '';
     }

    cancel(){
      this.isFormCancelled.emit(this.formCode);
     }

    statusChange(status:string , submissionCode: string,errorMessage:any){
         return {
             status:status,
             submissionCode :submissionCode ? submissionCode: '',
             timestamp : ( status == FORM_STATUS.SAVED || status == FORM_STATUS.SUBMITTED ) ? new Date().toISOString() : '',
             errorMessage : errorMessage ? errorMessage : '' 
         }
     }
    
    emptyResponseSave(data: any) {
        let isEmptyResponse = false;
         if (data.formSections instanceof Array) {
           for (let i = 0; i < data.formSections.length; i++  ) {
             data.formSections[i].responses = data.formSections[i].responses.filter((question) => {
               let control = this._formvalidationService.getQuestionControl(question.questionSequenceCode);
                if(control != undefined){
                if (control.value != "" && control.value != null) {
                  isEmptyResponse = true;
                } 
              } return true;
             });
           } 
         } 
         return isEmptyResponse;
      }
}
