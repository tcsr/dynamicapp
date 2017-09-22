https://hassantariqblog.wordpress.com/2017/03/22/angular2-using-custom-loader-spinner-as-service-in-angular-2-application/

1> loader.service.ts:
--------------------

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  display(value: boolean) {
    this.status.next(value);
  }
}
-------------------------
  
2> app.module.ts:
-----------------

import { LoaderService } from './services/loader.service'

providers: [LoaderService],


3> app.component.ts:
--------------------

import { LoaderService } from './services/loader.service'

constructor(private loaderService: LoaderService) { }

 ngOnInit() {
  this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
 }

 <span *ngIf="showLoader" class="loading"></span>
 
 ----------------------Usage-----------------------------------
4> panel.component.ts:
 
 import { LoaderService } from './../../services/loader.service'
 
 constructor(private loaderService: LoaderService) { }
 
 this.loaderService.display(true);
 this.loaderService.display(false);
 
 --------------------------------------------------------------

