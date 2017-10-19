import { Component, Input, OnInit } from '@angular/core';
import { MODE } from '../../../config/globals.ts';
    
//Date Component
@Component({
    selector: 'date-component',
    styleUrls: ['./../question.scss'],
    template: `<div class="dateComponent" [class.has-error]="(isSubmitClicked && !control?.valid) || (control?.errors?.Required && !control.readOnly)" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3,'col-md-3 inline-padding': questiondata.params.inline == 4}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                    <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order"></label-text>
                            <div class='input-group date col-sm-2'>
                                <input type='text' placeholder="mm-dd-yyyy" [textMask]="{mask: mask}" class='form-control' [formControl]="control" [attr.id]="sectionId+'_'+questiondata.order" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' ">
                                <span class="input-group-addon" (click)="calendarClick($event)">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                            <datepicker class="calendar" *ngIf= "openDatePicker" [ngModel]="response" (selectionDone)="dateSelected($event)" [showWeeks]=false (click)="onDatePickerClick($event)"></datepicker>
                    <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                    <div *ngIf="control?.dirty && !control?.valid && !control?.errors?.required && !control.readOnly" class="text-danger validDate-error"><span>Please enter a valid date</span></div>
                </div><br/><br/>`  ,
    host: {
        '(document:click)': 'onDocumentClick($event)',
    }
})

export class DateComponent implements OnInit {
    @Input() questiondata: any;
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() mode: string;
    
    private response: any = "";
    private openDatePicker: boolean = false;
    private mask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    
    constructor() {
    }
    ngOnInit() {
        if ( this.questiondata.iterations ) 
        	this.control.setValue(this.questiondata.iterations[0].responseText ?  this.formatDate( new Date( this.questiondata.iterations[0].responseText.replace(/-/g, '//')) ) : '');
        if ( this.control.readOnly ) {
            this.control.disable(true);
        }
    }
    
    formatDate(date) {
        let month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
        let day = (date.getDate() < 10) ? ('0' + (date.getDate())) : date.getDate();
        let formattedDate = date ? (month + '-' + day + '-' + date.getFullYear()).replace(/-/g, '//'): ''; 
        return formattedDate;
    }
    onDatePickerClick(event) {
        event.stopPropagation();
    }
    onDocumentClick(event) {
        this.openDatePicker = false;
    }
    dateSelected(event) {
        this.control.setValue(this.formatDate(event));
        this.openDatePicker = false;
    }
    calendarClick(event) {
        if (this.control.disabled) return false;
        event.stopPropagation();
        this.response = this.control.valid ? this.control.value : "";
        this.openDatePicker = !this.openDatePicker;
    }
}