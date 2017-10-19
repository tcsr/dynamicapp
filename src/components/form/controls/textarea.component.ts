import { Component, Input, OnInit, HostListener} from '@angular/core';
import { GLOBAL_CONSTANTS, MODE } from '../../../config/globals.ts';

//Text Area Component
@Component( {
    selector: 'textarea-component',
    styleUrls: ['./../question.scss'],
    template: ` <div [class.has-error]="isSubmitClicked &&!control?.valid && !control.readOnly" [ngClass]="{'col-md-4 inline-padding': questiondata.params.inline == 3,'col-md-3 inline-padding': questiondata.params.inline == 4}" [ngClass]="{'col-md-3 inline-padding': questiondata.params.inline == 4}" [attr.id]="sectionId+'_'+questiondata.order+'_div'">
                  <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order+'_textarea'"></label-text>
                    <textarea class="form-control" [(ngModel)]="response" [formControl]="control" [attr.name]="sectionId+'_'+questiondata.order" [attr.id]="sectionId+'_'+questiondata.order+'_textarea'" [attr.maxlength]="questiondata.params.charLimit?questiondata.params.charLimit:'${GLOBAL_CONSTANTS.textareaLength}'"  [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' "></textarea>
                    <errorMessages *ngIf="!control.readOnly" [control]='control' [params]='questiondata.params' [isSubmitClicked]="isSubmitClicked"></errorMessages>
                    <br/>
                </div><br/>
                 `
})

export class TextArearBoxComponent implements OnInit {
    @Input() questiondata: any;
    @Input() control: any;
    @Input() sectionId: any;
    @Input() isSubmitClicked;
    @Input() mode: string;

    private response = "";
    constructor() { }

    ngOnInit() {
        if ( this.questiondata.iterations )
            if ( this.questiondata.iterations[0].responseText ) {
                this.response = this.questiondata.iterations[0].responseText;
            }
        if ( this.control.readOnly ) {
            this.control.disable( true );
        }
    }

    @HostListener( 'input', ['$event'] ) OnChange( event ) {
        let value: string = event.target.value;
        let pattern = /(^\s\a*)/g;
        if ( pattern.test( value ) ) {
            this.control.setValue( value.trim() );
        } else {
            this.control.setValue( value );
        }
    }  
}