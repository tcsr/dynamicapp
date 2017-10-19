import { Component, Input, OnInit } from '@angular/core';
import { MODE } from '../../../config/globals.ts';

//Checkbox Component
@Component({
    selector: 'checkbox-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="control.touched &&!control.valid && !control.readOnly" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3,'col-md-3 inline-padding': questiondata.params.inline == 4}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                    <span class="question-label" [attr.for]="sectionId+'_'+questiondata.order+'_'+option">
                        <span class="asterix-space">{{(questiondata.params && questiondata.params.required == 'yes')?'*' : ''}}</span>
                        <span class="asterix-space">{{(questiondata.params.required == 'conditional' && questiondata.params.conditions[0].required == 'yes')?'*' : ''}}</span>
                        <span [innerHTML]="questiondata.questionText"></span>
                        <help-text *ngIf="!control.readOnly && questiondata.helpText" [helptext]="questiondata.helpText"></help-text>
                    </span>
                    <div class="checkbox" *ngFor="let option of questiondata?.allowedOptions; let i=index">
                        <label class="radio-chkbx-label"><input type="checkbox" [checked]="response.indexOf(option.value)!=-1" (change)="onChange($event,option)" [attr.name]="sectionId+'_'+questiondata.order+'_'+i" [attr.value]="option.value" [attr.id]="sectionId+'_'+questiondata.order+'_'+i" [disabled]="control.disabled" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' " >{{option.display}}</label>
                    </div>
                    <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                    <br/>
                </div><br/>
                 `
})

export class CheckboxComponent implements OnInit{
    @Input() questiondata: any;                    
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() controlObject;
    @Input() mode: string;
    private responseArrayValues: string;
    private response = [];
    
    constructor() { }
    ngOnInit() {
        if (this.questiondata.iterations && this.questiondata.iterations[0].responseText) this.response = this.questiondata.iterations[0].responseText.split('|');
        this.control.setValue(this.response);
        if(this.questiondata.iterations[0].responseMetadata && this.questiondata.iterations[0].responseMetadata.chosenResponses){
            this.controlObject.value.iterations[0].responseMetadata.chosenResponses=this.questiondata.iterations[0].responseMetadata.chosenResponses;
            this.controlObject.value.iterations[0].responseMetadata.allowedResponses = this.questiondata.allowedOptions;
        }
        this.response.length == 0 ? this.control.setValue("") : this.control.setValue(this.response.filter(Boolean).join("|"));

        if ( this.control.readOnly ) {            
            this.control.disable( true );
        }
    }
    onChange($event, option) {
        let value = $event.target.value;
        if ($event.target.checked) {
            if (this.questiondata.params.exclusive != null && value == this.questiondata.params.exclusive) {
                this.response.splice(this.questiondata);
                if(this.response.indexOf(value) == -1)
                this.response.push(value);                
            } else {
                if(this.response.indexOf(value) == -1)
                this.response.push(value);
                if (this.response[0] == this.questiondata.params.exclusive) {
                    this.response.splice(this.response.indexOf(this.response[0]), 1);
                }
            }
        } else {
            this.response.splice(this.response.indexOf(value), 1);
        }        
        this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata['chosenResponses'] = this.questiondata.allowedOptions.filter((elem)=>{
            if(this.response.indexOf(elem.value) != -1){
                return true;
            }else{
                return false;
            }
        });
        this.controlObject.value.iterations[this.controlObject.value.iterations.length - 1].responseMetadata['allowedResponses'] = this.questiondata.allowedOptions;
        this.response.length == 0 ? this.control.setValue("") : this.control.setValue(this.response.filter(Boolean).join("|"));
        this.control.markAsTouched(true);
    }
}