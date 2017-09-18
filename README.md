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
