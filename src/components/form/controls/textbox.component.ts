import { Component, Input, OnInit, HostListener} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MODE } from '../../../config/globals.ts';
//Text box Component
@Component( {
    selector: 'text-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="(control?.value !='' && control?.invalid) || (control?.touched && control?.invalid) || (isSubmitClicked && control?.invalid)" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                    <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order"></label-text>
                      <input *ngIf="questiondata.params?.validation?.type != 'phone'" class="form-control" [formControl]="control" [attr.type]="questiondata.type" [(ngModel)]="response" [attr.name]="sectionId+'_'+questiondata.order" [attr.id]="sectionId+'_'+questiondata.order" [attr.maxlength]="questiondata.params.charLimit" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' ">
                      <input *ngIf="questiondata.params?.validation?.type == 'phone'" class="form-control" [textMask]="{mask: mask}"  [formControl]="control" [attr.type]="questiondata.type" [(ngModel)]="response" [attr.name]="sectionId+'_'+questiondata.order" [attr.id]="sectionId+'_'+questiondata.order" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' ">
                    <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]='isSubmitClicked'></errorMessages>
                    <br/>
                </div><br *ngIf="!questiondata.params.inline" />
              `
})
export class TextBoxComponent implements OnInit {
    @Input() questiondata: any;
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() mode: string;

    private response = "";
    private mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    ngOnInit() {
        if ( this.questiondata.iterations )
            if ( this.questiondata.iterations[0].responseText )
                this.response = this.questiondata.iterations[0].responseText;
        if ( this.control.readOnly ) {
            this.control.disable( true );
        }
    }
    @HostListener( 'input', ['$event'] ) OnChange( event ) {
        let value: string = event.target.value;
        if ( value ) {
            if ( this.questiondata.params.validation != null && this.questiondata.params.validation.type == 'phone' ) {
                value = value.split( '-' ).join( "" );
                this.control.setValue( value );
            } else {
                let pattern = /(^\s\a*)/g;
                if ( pattern.test( value ) ) {
                    this.control.setValue( value.trim() );
                } else {
                    this.control.setValue( value );
                }
            }
        }
    }
}