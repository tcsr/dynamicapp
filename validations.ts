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
  
