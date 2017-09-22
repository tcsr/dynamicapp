https://hassantariqblog.wordpress.com/2017/03/22/angular2-using-custom-loader-spinner-as-service-in-angular-2-application/

app.module.ts:
--------------

import { LoaderService } from './services/loader.service'

providers: [LoaderService],

loader.service.ts:
------------------

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

app.component.ts:
-----------------

import { LoaderService } from './services/loader.service'

constructor(private loaderService: LoaderService) { }

 ngOnInit() {
  this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
 }

 <span *ngIf="showLoader" class="loading"></span>
 
 ----------------------Usage-----------------------------------
 panel.component.ts:
 
 import { LoaderService } from './../../services/loader.service'
 
 constructor(private loaderService: LoaderService) { }
 
 this.loaderService.display(true);
 this.loaderService.display(false);
 
 --------------------------------------------------------------

