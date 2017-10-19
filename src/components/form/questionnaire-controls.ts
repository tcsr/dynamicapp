import { Component, Input, OnInit } from '@angular/core';
import { TextBoxComponent } from './controls/textbox.component';
import { TextArearBoxComponent } from './controls/textarea.component';
import { DateComponent } from './controls/date.component';
import { RadioComponent } from './controls/radio.component';
import { CheckboxComponent } from './controls/checkbox.component';
import { DropdownComponent } from './controls/dropdown.component';
import { AttachmentComponent } from './controls/attachment.component';
import { SearchComponent } from './controls/search.component';

//Error Messages
@Component({
    selector: 'errorMessages',
    styleUrls: ['question.scss'],
    template: `<span *ngIf="isSubmitClicked && control?.errors?.required"><span class="text-danger required-error">Required</span></span>
               <span *ngIf="control?.touched && control?.errors?.maxlength" class="text-danger maxLength-error"><span>Maximum character limit exceeded</span></span>
               <span *ngIf="control?.touched && control?.errors?.pattern" class="text-danger pattern-error">
                   <span *ngIf="params?.validation?.type == 'email'" class="email-error">Please enter a valid email address</span>
                   <span *ngIf="params?.validation?.type == 'phone'">Please enter a valid phone number</span>
                   <span *ngIf="params?.validation?.type == 'regex'">Invalid format</span>
                   <span *ngIf="params?.validation?.type == 'alphanumeric'">Invalid Input data</span>
               </span>
               <span *ngIf="isSubmitClicked && control?.errors?.Required" class="text-danger required-error">Required</span>
            `
})
export class ErrorMessages {
    @Input() control: any;
    @Input() params: any;
    @Input() isSubmitClicked;
}

//Label Component
@Component({
    selector: 'label-text',
    styleUrls: ['question.scss'],
    template: ` <label class="question-label" [attr.for]="attrFor">
                    <span class="asterix-space">{{(questiondata.params && questiondata.params.required == 'yes')?'*' : ''}}</span>
                    <span class="asterix-space">{{(questiondata.params.required == 'conditional' && questiondata.params.conditions[0].required == 'yes')?'*' : ''}}</span>
                    <span [innerHTML]="questiondata.questionText"></span>
                    <help-text *ngIf="questiondata.helpText" [helptext]="questiondata.helpText"></help-text>
                 </label>
                 <br/>
             `
})

export class LabelTextComponent {
    @Input() questiondata: any;
    @Input() helptext: any;
    @Input() attrFor: any;
}

//Help Text Component
@Component({
    selector: 'help-text',
    styleUrls: ['question.scss'],
    template: `<span>
                  <span popover="{{helptext}}"
                        popoverPlacement="bottom"
                        [popoverOnHover]="true"
                        [popoverCloseOnMouseOutside]="true">
                        <span class="helptext">i</span>
                   </span>
               </span>
            `
})

export class HelpTextComponent {
    @Input() helptext: any;
}

//Information Component
@Component({
    selector: 'info-component',
    styleUrls: ['question.scss'],
    template: `<div>
                  <div  class="question-label">
                    <span>{{questiondata.questionText}}</span>
                    <help-text *ngIf="!control?.readOnly && questiondata.helpText" [helptext]="questiondata.helpText"></help-text>
                    <br/>
                   </div>
               </div>
               <br/><br/>
              `
})
export class InformationComponent {
    @Input() questiondata: any;
    @Input() control: any;
    constructor() { }
    ngOnInit() {
    }
}

export const QuestionnaireControls: any[] = [
    TextBoxComponent, TextArearBoxComponent, RadioComponent, DateComponent, CheckboxComponent, InformationComponent, DropdownComponent, HelpTextComponent, AttachmentComponent, SearchComponent,LabelTextComponent
];