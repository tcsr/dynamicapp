Link: http://www.angulartutorial.net/2017/04/select-all-deselect-all-checkbox.html

 <p-dataTable [value]="rows" [rows]="10" [paginator]="true" [pageLinks]="3">
    <p-column [style]="{'width':'38px'}">
      <ng-template pTemplate="header">
        <!-- Select All -->
        <p-checkbox #selall (onChange)="selectAllChanged($event,selall)"></p-checkbox>
      </ng-template>
      <ng-template let-col let-rowdata="rowData" pTemplate="body">
        <!-- <p-checkbox [value]="true" (onChange)="selectRowChanged($event,rowdata)"></p-checkbox> -->
        <input type="checkbox" [(ngModel)]="rowdata.hasselect" (change)="selectRowChanged($event,rowdata)" />
      </ng-template>
    </p-column>
    <p-column *ngFor="let col of cols" [field]="col.field" [header]="col.header"></p-column>
  </p-dataTable>
  
  -----------------------------------------------------
  
  selectAllChanged(event, selall) {
    console.log(selall)
    if (event) {
      this.rows.forEach(row => {
        row['hasselect'] = true;
      });
    }
    else {
      this.rows.forEach(row => {
        row['hasselect'] = false;
      });
    }
  }

  selectRowChanged(event, rowData) {
    let selectAll = this.rows.forEach(row => {
      return row.hasselect == true
    });
    console.log(selectAll)
    // this.selall['checked']
  }
