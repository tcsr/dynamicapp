https://www.npmjs.com/package/ng2-bootstrap-modal

npm install ng2-bootstrap-modal --save

app.module.ts:

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './dynamic/popup/confirm.component';

entryComponents: [ConfirmComponent],
imports: [BootstrapModalModule],
declarations: [ConfirmComponent]

-----------------
confirm.component.ts :

import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmModel {
  title:string;
  message:string;
}

@Component({
  selector: 'confirm',
  template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
                   </div>
                 </div>
                </div>`
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
==============
panel.component.ts :

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './../popup/confirm.component'


constructor(private dialogService: DialogService) { }

showConfirm() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: "Confirm",
      message: "This is a Confirm dialog"
    })
      .subscribe((isConfirmed) => {
        this.confirmResult = isConfirmed;
        console.log(this.confirmResult)
      })
  };


<button (click)="showConfirm()">Confirmation</button>

