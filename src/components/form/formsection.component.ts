import { Component, Input, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'section',
  template: `   <div class="form-section-outer">
                    <div class="form-section-inner">
                        <div class="form-section-main row">
                            <h1 *ngIf="section.title" class="form-section-title">{{section.title}}</h1>
                            <h2 *ngIf="section.header" class="form-section-header">{{section.header}}</h2>
                            <div class="questions">
                                <question *ngFor="let question of section?.questions; let i = index;"
                                    [question]="question"
                                    [sectionGroup]="sectionGroup"
                                    [sectionId]="section.formSectionCode"
                                    [isSubmitClicked]="isSubmitClicked"
                                    [mode]="mode">
                                </question> 
                            </div>
                        </div>
                    </div>
                </div>`,
  styleUrls: ['formsection.scss']
})
export class FormSectionComponent {
    @Input() sectionGroup: any;
    @Input() section: any;
    @Input() isSubmitClicked:any;
    @Input() mode:string;

    constructor(){}
}
