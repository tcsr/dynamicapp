<my-date-picker formControlName="toDate" name="toDate" [options]="myDatePickerOptions" [(ngModel)]="toDate" (dateChanged)="onToDateChanged($event)"></my-date-picker>
---------------------------------------------



//import { IMyDpOptions } from 'mydatepicker';
import { MyDatePicker, IMyDpOptions, IMyDateModel } from 'mydatepicker';
----------------------------------------------------------
 onToDateChanged(event: IMyDateModel) {
        //console.log("Date :: " + event.formatted + "\n");

        //this.checkDate(event.formatted);
        if (event.formatted === "" && this.searchForm.value.toDate instanceof Object) {
            this.searchForm.value.toDate.formatted = "";
        }
		
		}
		
		
		-------------------------------
		
    //DatePicker - Code Begin Here
    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: this.dateService.dateFormate(),
        editableDateField: false,
        disableSince: this.dateService.disableDate()
    };

    private model: Object = { date: { year: 2018, month: 10, day: 9 } };
    //DatePicker - Code End Here
	----------------------------------------
	
	Loader
	
	
	<div *ngIf="spinnerFlag">
    <div class="myOverlay"></div>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw loadingGIF"></i>
</div>
------------------------------


 spinnerFlag: boolean = false;
 
 ///before service call
 
 
 this.spinnerFlag = true;

        this.dashboardService.download_File(this.requestName, fileType, this.sectionName, selectedIDs, this.searchForm.value)
            .subscribe(data => {
                FileSaver.saveAs(data, fileName);

                this.spinnerFlag = false;
            });
	---------------------------
	
	
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  
  ------------------------------------
  
  declare var localStorage: Storage;
    localStorage.setItem("EXPORT_BILLS_AGING_DETAILS", JSON.stringify(data));
	 this.exportBillsAgingDetails = (localStorage.getItem("EXPORT_BILLS_AGING_DETAILS")) ? JSON.parse(localStorage.getItem("EXPORT_BILLS_AGING_DETAILS")) : "";
	-------------------------------
  
    //Setting URL Parameter
    setConfig(key, value) {
        this.config[key] = value;

        localStorage.setItem(key, value);
    }

    //Getting URL Parameter
    getConfig(key) {
        return localStorage.getItem(key);

        //return this.config;
    }
---------------------------

<div>
  <div *ngFor="let panel of dynamicData | orderby:'PANEL_ORDER'">
    <!-- {{panel.PANEL_ID}} : {{panel.PANEL_ORDER}} : {{ panel.PANEL_TYPE}} <br> -->
    <div class="panel panel-default">
      <div *ngIf="panel.PANEL_TITLE" class="panel-heading panel-title text-center col-md-12">
        {{ panel.PANEL_TITLE}}
      </div>

    </div>

    <div>
      <div *ngFor="let panelval of panel?.PANEL_CONTENT | orderby:'ORDER'" [ngClass]="{'col-md-12': panel.COMP_PER_ROW == 1,'col-md-6': panel.COMP_PER_ROW == 2, 'col-md-4': panel.COMP_PER_ROW == 3, 'col-md-3': panel.COMP_PER_ROW == 4}" class="comp-space">
        <!-- <pre *ngIf="panelval">{{ panelval | json }}</pre> -->
        <!-- <div *ngIf="panelval.COMP_NAME">{{ panelval.COMP_NAME }} - {{ panelval.COMP_LABL }}</div> -->

        <div *ngIf="panelval.COMP_TYPE=='ENV_LINK'" class="row">
          <div class="col-md-12">
            <div style="margin: 8px 0;">
              <envLink-Component [envLinkData]="panelval"></envLink-Component>
            </div>
          </div>
        </div>

        <div class="col-md-3" *ngIf="panelval.COMP_TYPE=='Menu'">
          <menu-component [menuData]='panelval'></menu-component>
        </div>
        <!-- <div class="col-md-9" *ngIf="panelval?.NESTED_PANELS?.PANEL_CONTENT">
         :NESTED_PANELS:
        
       </div> -->



        <!-- PanelVal := {{panelval | json}} -->



        <div [ngSwitch]="panelval.COMP_TYPE">
          <!-- {{panelval  | json}} -->
          <div *ngSwitchCase="'Text_Box'" [style.width.%]="panelval.compWidth">
            <textbox-component [dynamicData]="panelval"></textbox-component>
          </div>
          <div *ngSwitchCase="'Text_Area'" [style.width.%]="panelval.compWidth">
            <textarea-component [dynamicData]="panelval"></textarea-component>
          </div>
          <div *ngSwitchCase="'Radio'">
            <radio-component [dynamicData]="panelval"></radio-component>
          </div>
          <div *ngSwitchCase="'Date_Picker'" [style.width.%]="panelval.compWidth">
            <date-component [dynamicData]="panelval"></date-component>
          </div>
          <div *ngSwitchCase="'Check_Box'">
            <checkbox-component [dynamicData]="panelval"></checkbox-component>
          </div>
          <div *ngSwitchCase="'Drop_Down'" [style.width.%]="panelval.compWidth">
            <dropdown-component [dynamicData]="panelval"></dropdown-component>
          </div>
          <div *ngSwitchCase="'Label'" [style.width.%]="panelval.compWidth">
            <label-component [dynamicData]="panelval"></label-component>
          </div>
          <div *ngSwitchCase="'Empty'" [style.width.%]="panelval.compWidth">
            <empty-component></empty-component>
          </div>

          <!-- </div> -->

        </div>



        <div *ngIf="panelval.COMP_NAME"></div>

        <!-- <div *ngFor="let pval of panelval">

          <pre>{{ pval | json }}</pre>

        </div> -->
        <div *ngIf="panel.PANEL_TYPE == 'Button_Panel' && panelval.COMP_LABL">
          <!-- <pre> {{panelval | json}} </pre> -->
          <button-component [dynamicData]="panelval"></button-component>
        </div>


        <panel-component [dynamicData]="panelval.NESTED_PANELS"></panel-component>
      </div>
    </div>
  </div>
</div>

-------------------------
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentRef, ViewContainerRef } from '@angular/core';
import { ComponentFactory, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core'
 constructor(private _dgitService: DgitService, private resolver: ComponentFactoryResolver) { }
 
   @ViewChild("dgitContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;
	
    loadComponent(componentName: any, dynamicData: any) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentName);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.dynamicData = dynamicData;
    this.componentRef.instance.output.subscribe(event => console.log(event));
  }
 
