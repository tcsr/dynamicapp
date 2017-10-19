import { Component, Input, OnInit } from '@angular/core';   

//Attachment Component
@Component({
    selector: 'attachment-component',
    styleUrls: ['./../question.scss'],
    template: ` <label-text [questiondata]="questiondata" [helptext]="questiondata.helpText" [attrFor]="sectionId+'_'+questiondata.order"></label-text>  
                <div class="file">
                    <input type="file"  ngFileSelect  [options]="options" (onUpload)="handleUpload($event)" [style.width]="(!questiondata.params.inline)? questiondata.params.width + '%' : '' " >
                </div>
              `
})

export class AttachmentComponent {
    @Input() questiondata: any;
    @Input() control: any;
    @Input() sectionId: any;    
    @Input() isSubmitClicked;
    
    private response = "";
    private uploadFile: any;
    private options: Object = {
        url: 'http://localhost:4200/upload'
    };
    
    constructor() { }

    // handle upload    
    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }
    ngOnInit() {
        if(this.control.readOnly){
            this.response = this.questiondata.iterations[0].responseText;
            this.control.disable(true);
        }
    }
}
