<form [formGroup]="tableForm" *ngIf="tableForm">
  <p-dataTable [value]="rows" [rows]="10" [paginator]="true" [pageLinks]="3" [editable]="true">

      <p-column *ngFor="let col of cols; let i=index;" formArrayName="dataRow" [field]="col.field" [header]="col.header" [editable]="true" [style]=" {'overflow':'visible' }">
        <ng-template let-col let-car="rowData" pTemplate="body">
          {{car[col.field]}} {{i}}
        </ng-template>
        <ng-template let-col let-car="rowData" pTemplate="editor">
          <input type="text" [(ngModel)]="car[col.field]" appendTo="body" [formControlName]="col?.field" />
          <span>
            {{ tableForm?.controls?.dataRow?.controls[col?.field]?.errors | json}}
          </span>
        </ng-template>
      </p-column>
    </p-dataTable>
</form>

tableForm: any;
 ngOnInit() {
this.tableForm = this.fb.group({
      "dataRow": this.buildDataRow(this.rows)
    })
}


 buildDataRow(rows) {
    let formGroup = {};


    rows.forEach((row, index) => {
      console.log(row)
      this.cols.forEach(col => {
        formGroup[row[col.field]] = ['', Validators.required]
      });

    });

    return this.fb.group(formGroup);
  }

-----------------------------------------------
this.rows.forEach((row, i) => {
      if (!row.company1) {  
        console.log(row.company1)
        alert('Error in line ' + (i+1));
        return false;
      }
      else{
        alert('Success')
      }
    });
------------------------------------------------
  
  
  import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
      }
  }
}


------------------------------------------------
  app.module.ts
  import { OnlyNumber } from './number.directive';
 declarations: [OnlyNumber]

Usage: <input type="text" OnlyNumber="true" />
------------------------------------------------
