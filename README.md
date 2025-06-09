
Step 1 - Uninstall all Karma Jasmine Packages 
     --> npm uninstall @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
Step 2 - Remove test object from Angular.json
Step 3 - Delete karma.conf.js file and test.ts file
Step 4 - Install JEST --> npm i jest @types/jest jest-preset-angular
Step 5 - Create setup.jest.ts file
Step 6 - Update tsconfig.spec.json file
Step 7 - Add jest configuration in package.json

 "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/src/setup.jest.ts"
    ],
    "testPathIgnorePatterns": [
      "<rootDir>/node_modules/",
      "<rootDir>/dist/"
    ],
    "globals": {
      "ts-jest": {
        "tsConfig": "<rootDir>/tsconfig.spec.json",
        "stringifyContentPathRegex": "\\.html$"
      }
    }
  }

Step 8 - Add scripts in package.json to run JEST

 "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },

  ==========================================

<input type="text" placeholder="Test Price" [ngModel]="testPrice | currency:'USD':'symbol':'2.2'" [ngModelOptions]="{updateOn:'blur'}"
    (ngModelChange)="testPrice=$event" />

https://mattlewis92.github.io/angular-calendar/#/kitchen-sink

=====================================================================================================================
  
	  <panel>
		IF  <panel-content>
		   
		   IF <nested-panel>
			
				  if<panel-content>
				  
				   </panel-content>
			
			  </nested-panel>
	   
		   </panel-content>
	  </panel>
=================================================================================  
<dynamic-controls>
  
  <div *ngFor="let dynamiComp of dynamicData">
  
	  <div [ngSwitch]="dynamiComp.COMP_TYPE">
	  
	   <div *ngSwitchCase="'Text_Box'" [style.width.%]="dynamiComp.compWidth">
			<textbox-component [dynamicData]="dynamiComp"></textbox-component>
        </div>
        <div *ngSwitchCase="'Text_Area'" [style.width.%]="dynamiComp.compWidth">
			<textarea-component [dynamicData]="dynamiComp"></textarea-component>
        </div>
        <div *ngSwitchCase="'Radio'">
			<radio-component [dynamicData]="dynamiComp"></radio-component>
        </div>
        <div *ngSwitchCase="'Date_Picker'" [style.width.%]="dynamiComp.compWidth">
			<date-component [dynamicData]="dynamiComp"></date-component>
        </div>
        <div *ngSwitchCase="'Check_Box'">
			<checkbox-component [dynamicData]="dynamiComp"></checkbox-component>
        </div>
        <div *ngSwitchCase="'Drop_Down'" [style.width.%]="dynamiComp.compWidth">
			<dropdown-component [dynamicData]="dynamiComp"></dropdown-component>
        </div>
        <div *ngSwitchCase="'Label'" [style.width.%]="dynamiComp.compWidth">
			<label-component [dynamicData]="dynamiComp"></label-component>
        </div>
        <div *ngSwitchCase="'Empty'" [style.width.%]="dynamiComp.compWidth">
			<empty-component></empty-component>
        </div>
	  
	  </div>
  
  </div>
  
</dynamic-controls>
  
  
=================================================================================

	  <div *ngFor="let panel of  Panels">
	    <panel [dynamicData]=""></panel>
	  </div>
	  
=================================================================================
     <panel>
	 
	   <div class="panel panel-default">
	   
		   <div *ngIf="panel.PANEL_TITLE" class="panel-tilte">
		      {{ panel.PANEL_TITLE }}
		   </div>
		   
		   <div *ngIf="panel.PANEL_CONTENT" class="panel-body">
		      
				<div *ngFor=" let panelContent of panel.PANEL_CONTENT">
				
					<panel-content [dynamicData]="panelContent"></panel-content>
				
				</div>
											  			   
			</div>  
			
	  </div>
		   	    	 
	 </panel>
      
=================================================================================
  
  <panel-content>
  
	<div *ngFor=" let panelContent of panel.PANEL_CONTENT">
				
	   <dynamic-controls [dynamicData]="panelContent"></dynamic-controls>
				
	</div>
    
  </panel-content>
  
=================================================================================
  
  <nested-panel-content>
  
	<div *ngFor=" let panelContent of panel.PANEL_CONTENT">
				
	   <dynamic-controls [dynamicData]="panelContent"></dynamic-controls>
				
	</div>
    
  </nested-panel-content>

=================================================================================



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
 ------------------css
 .myOverlay {
z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: #000;
}

.loadingGIF {
    margin-top: 27%;
    position: absolute;
    left: 45%;
    top: 0;
    z-index: 3;
    font-size: 64px;
}
