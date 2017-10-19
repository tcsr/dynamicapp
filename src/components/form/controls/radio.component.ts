import { Component, Input, OnInit } from '@angular/core';
import { MODE } from '../../../config/globals.ts';

//Radio Component
@Component({
    selector: 'radio-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="control.touched &&!control.valid && !control.readOnly" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3,'col-md-3 inline-padding': questiondata.params.inline == 4}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                    <span class="question-label" [attr.for]="sectionId+'_'+questiondata.order" style="display:inline-block">
                        <span class="asterix-space" *ngIf="(questiondata.params && questiondata.params.required == 'yes')||(questiondata.params.required == 'conditional' && questiondata.params.conditions[0].required == 'yes')">*</span>                        
                        <span [innerHTML]="questiondata.questionText"></span>
                        <help-text *ngIf="!control.readOnly && questiondata.helpText" [helptext]="questiondata.helpText"></help-text>
                    </span>
                    <div class="radio radio-space" *ngFor="let option of questiondata?.allowedOptions; let i=index">
                        <label class="radio-chkbx-label"><input type="radio" [checked]="option.value == response" (change)="OnChange($event)" [attr.name]="sectionId+'_'+questiondata.order+'_'+i" [attr.id]="sectionId+'_'+questiondata.order+'_'+i" [attr.value]="option.value" [disabled]="control.disabled" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' " >{{option.display}}</label>
                    </div>
                    <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                    <br/>
                </div><br/>
                 `
})

export class RadioComponent implements OnInit {
    @Input() questiondata: any;
    @Input() control: any;
    @Input() sectionId: any;    
    @Input() isSubmitClicked;
    @Input() controlObject:any;
    @Input() mode: string;
    private response = "";
    
    constructor() { }
    ngOnInit() {
        if(this.questiondata.iterations && this.questiondata.iterations[0].responseText) this.response = this.questiondata.iterations[0].responseText;
        let options = this.questiondata.allowedOptions;            
        this.control.setValue(this.response);
        
        if(this.questiondata.iterations[0].responseMetadata && this.questiondata.iterations[0].responseMetadata.chosenResponses){
            this.controlObject.value.iterations[0].responseMetadata.chosenResponses=this.questiondata.iterations[0].responseMetadata.chosenResponses;
            this.controlObject.value.iterations[0].responseMetadata.allowedResponses = options;
        }  
        this.control.valueChanges.subscribe(item => this.response = item);
        if ( this.control.readOnly ) {
            this.control.disable(true);
        }
    }
    OnChange($event) {
        let value = $event.target.value;
        let options = this.questiondata.allowedOptions;
        this.response = value;
        this.control.setValue(value);
        this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.chosenResponses.length = 0;
        if(value){  
            this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.chosenResponses.push(options.filter(function(element){
            let matchFound = false;                     
            if(element.value == value){
                matchFound = true;
            }
            return matchFound;
        })[0]);
            this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata.allowedResponses = options;
        }
        this.control.markAsTouched(true);
    }
}