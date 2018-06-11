

header.html
-------------------------
<div class="row mainHeader">
    <div class="col-xs-12 col-sm-2 col-md-1 col-lg-1">
        <div class="logo mainHeader padding10">
            eTrade
        </div>
    </div>

    <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9 header padding0">        
        <div class="row tabs-selection">
            <div class="col-sm-1 col-md-1 col-lg-1">
                <app-tab [active]="isSelected(1)" (click)="setTab(1)">Export Bills</app-tab>
            </div>
            <div class="col-sm-1 col-md-1 col-lg-1">
                <app-tab [active]="isSelected(2)" (click)="setTab(2)">Import Bills</app-tab>
            </div>
            <div class="col-sm col-md col-lg"></div>
        </div>
    </div>
    
    <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 header padding10 ">
        <!--<login></login>-->
        Login
    </div>
</div>
-----------------------------
app.componet.html
--------------------
<!--<my-header></my-header>-->
<div id="mySidenav" class="sidenav">
    <a href="javascript:void(0)" class="closebtn" (click)="closeNav()">&times;</a>

    <div class="list-group panel margin0">
        <a href="#subItem1" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#mySidenav" (click)="menuImg1();">Service Request<i id="sideNavImg" [ngClass]="{ downArrow: menuImgActive1, upArrow: !menuImgActive1 }" ></i></a>

        <div class="collapse" id="subItem1" *ngIf="'EXPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="RequestEFric();">FIRC Issuance Request</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="FIRCAdvice();">Issuance of FIRC Advice</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BRCAdvice();">Issuance of BRC Advice</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ADTransfer();">Other Bank Bill Transfer Request (AD Transfer)</a>
        </div>

        <div class="collapse" id="subItem1" *ngIf="'IMPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="OtherBankBOE();">Other Bank BOE to Bank ORM Mapping Request</a>
        </div>

    </div>

    <div class="list-group panel margin0">
        <a href="#subItem2" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#mySidenav" (click)="menuImg2();">Reports<i id="sideNavImg1" [ngClass]="{ downArrow: menuImgActive2, upArrow: !menuImgActive2 }" ></i></a>

        <div class="collapse" id="subItem2" *ngIf="'EXPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="OutstandingInwardRemittance();">Outstanding Inward Remittance</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ExportBillUtilizationReport();">Export Bill Utilization Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="InwardRemittanceUtilizationReport();">Inward Remittance Utilization Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="FIRCIssuanceReport();">FIRC Issuance Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BRCIssuanceReport();">BRC Issuance Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="OutstandingExportBill();">Outstanding Export Bill</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ServiceRequestReport();">Service Request Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ProcessAutomationReport();">Process Automation Report</a>
            
        </div>

        <div class="collapse" id="subItem2" *ngIf="'IMPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="OutstandingORM();">Outstanding ORM</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="OutstandingImportBill();">Outstanding Import Bill</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ORMUtilizationReport();">ORM Utilization Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ImportBillUtilizationReport();">Import Bill Utilization Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ServiceRequestReportIDIS();">Service Request Report</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ProcessAutomationReportIDIS();">Process Automation Report-IDIS </a>
        </div>
    </div>

    <div class="list-group panel margin0">
        <a href="#subItem3" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#mySidenav" (click)="menuImg3();">Process Automation<i id="sideNavImg2" [ngClass]="{ downArrow: menuImgActive3, upArrow: !menuImgActive3 }" ></i></a>

        <div class="collapse" id="subItem3" *ngIf="'EXPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BillClosure();">Bill Closure</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="PaymentExtension();">Payment Extension</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="InwardRemittanceExtension();">Inward Remittance Extension</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="IRMAdjustment();">IRM Adjustment</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="IRMmapping();">Bill to IRM Mapping</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BillLodgement();">Bill Lodgement</a>
        </div>

        <div class="collapse" id="subItem3" *ngIf="'IMPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BOEExtension();">BOE Extension</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BOEAdjustment();">BOE Adjustment / Closure</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="BOEORMMapping();">BOE to Outward Remittance Mapping</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="ORMClosure();">Outward Remittance Adjustment / Closure Request</a>
        </div>
    </div>

    <div class="list-group panel margin0">
        <a href="#subItem4" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#mySidenav" (click)="menuImg4();">Workflow<i id="sideNavImg4" [ngClass]="{ downArrow: menuImgActive4, upArrow: !menuImgActive4 }" ></i></a>

        <div class="collapse" id="subItem4" *ngIf="'EXPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="WorkflowSetup();">Workflow Setup</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="WorkflowReviewerRequest();">Workflow Reviewer</a>
        </div>

        <div class="collapse" id="subItem4" *ngIf="'IMPORT' === currentTab()">
            <!--<a href="javascript:void(0);" class="list-group-item listItem" (click)="BOEExtension();">BOE Extension</a>-->
        </div>
    </div>
    <div class="list-group panel margin0">
        <a href="#subItem5" class="list-group-item list-group-item-success" data-toggle="collapse" data-parent="#mySidenav" (click)="menuImg5();">Role Management<i id="sideNavImg5" [ngClass]="{ downArrow: menuImgActive5, upArrow: !menuImgActive5 }" ></i></a>

        <div class="collapse" id="subItem5" *ngIf="'EXPORT' === currentTab()">
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="UserMaster();">User Master</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="RoleMaster();">Role Master</a>
            <a href="javascript:void(0);" class="list-group-item listItem" (click)="RolePageAssociation();">Role Page Association</a>
        </div>

        <div class="collapse" id="subItem5" *ngIf="'IMPORT' === currentTab()">
            <!--<a href="javascript:void(0);" class="list-group-item listItem" (click)="BOEExtension();">BOE Extension</a>-->
        </div>
    </div>
    <a href="javascript:void(0);" class="list-group-item list-group-item-success" data-parent="#mySidenav">Help</a>
</div>

<div id="main">

    <div id="mainHeader" class="row mainHeader" *ngIf="isLoginPage()">
        <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
            <div class="logo mainHeader padding10">
                <div class="openNav" (click)="openNav()">&#9776;</div>
                <span>eTrade</span>
            </div>
        </div>

        <div class="col-xs-8 col-sm-5 col-md-5 col-lg-6 header padding0">
            <div class="row">
                <div id="export" class="col-xs-6 col-sm-2 col-md-2 col-lg-2">
                    <a title="Export" routerLink="/dashboard">
                        <app-tab [active]="isSelected(1)" (click)="setTab(1)">Export</app-tab>
                    </a>
                </div>
                <div id="import" class="col-xs-6 col-sm-2 col-md-2 col-lg-2">
                    <a title="Import" routerLink="/details">
                        <app-tab [active]="isSelected(2)" (click)="setTab(2)">Import</app-tab>
                    </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 header"></div>
            </div>
        </div>
        <div class=" col-xs-12 col-sm-5 col-md-5 col-lg-4 profile header">
            <div class="row">
                <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1 profileLineheight padding10">
                    <!--<a routerLink="/dashboard" title="home"><img src="assets/images/home.png" /></a>-->
                    <a (click)="gotoDashboard()" title="Home"><img src="assets/images/home.png" /></a>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right padding10">{{loggedUName}}</div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 profileLineheight padding10">
                    <img src="assets/images/user.png" />
                </div>
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 profileLineheight logout padding10">
                    <img src="assets/images/logout.png" title="Logout" (click)="logout()" />
                </div>
            </div>
        </div>

    </div>

    <!--<router-outlet></router-outlet>-->
    <router-outlet (activate)="changeOfRoutes()"></router-outlet>
</div>
----------------------------------------------------------------
app.component.ts
--------------------
import { Component } from '@angular/core';
import { ExportBillsChartComponent } from './export/chart/exportBillChart/exportBillsChart.component';
import { ExportBillsAgingChartComponent } from './export/chart/exportBillAgingChart/exportBillsAgingChart.component';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host {
      font-family: Arial;
    }
  `]
})

export class AppComponent {
  tab: number = 1;
  active: boolean = false;
  menuImgActive1: boolean = true;
  menuImgActive2: boolean = true;
  menuImgActive3: boolean = true;
  menuImgActive4: boolean = true;
  menuImgActive5: boolean = true;
  innerHeight: any;
  innerWidth: any;
  loggedUName: any;


  constructor(private router: Router, private dashboardService: DashboardService) {
    // this.innerHeight = (window.screen.height) + "px";
    // this.innerWidth = (window.screen.width) + "px";
    // console.log(" this.innerHeight::"+ this.innerHeight+" this.innerHeight::"+this.innerWidth);

    this.checkCurrentTab();
  }

  //Following function used in side nab bar
  currentTab() {
    return this.dashboardService.getConfig("CURRENT_TAB");
  }

  changeOfRoutes() {
    this.checkCurrentTab();
  }

  checkCurrentTab() {
    var currentTab = this.dashboardService.getConfig("CURRENT_TAB");

    if (currentTab && "EXPORT" === currentTab)
      this.tab = 1;
    else if (currentTab && "IMPORT" === currentTab)
      this.tab = 2;
    else
      this.tab = 1;
  }

  setTab(num: number) {
    this.tab = num;

    this.active = (this.tab === num);
  }

  isSelected(num: number) {
    return this.tab === num;
  }

  exportTab = 3;

  menuImg1() {
    this.menuImgActive1 = !this.menuImgActive1;

    if (!this.menuImgActive1) {
      this.menuImgActive2 = true;
      this.menuImgActive3 = true;
    }
  }

  menuImg2() {
    this.menuImgActive2 = !this.menuImgActive2;

    if (!this.menuImgActive2) {
      this.menuImgActive1 = true;
      this.menuImgActive3 = true;
    }
  }

  menuImg3() {
    this.menuImgActive3 = !this.menuImgActive3;

    if (!this.menuImgActive3) {
      this.menuImgActive1 = true;
      this.menuImgActive2 = true;
    }
  }

  menuImg4() {
    this.menuImgActive3 = !this.menuImgActive3;

    if (!this.menuImgActive3) {
      this.menuImgActive1 = true;
      this.menuImgActive2 = true;
    }
  }
  menuImg5() {
    this.menuImgActive5 = !this.menuImgActive5;

    if (!this.menuImgActive3) {
      this.menuImgActive1 = true;
      this.menuImgActive2 = true;
    }
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "0px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("main").style.marginLeft = "0";
  }

  isLoginPage() {
    /*if ("LOGIN" == window.location.href.split('/')[3].toUpperCase() || "LOGIN" == window.location.href.split('/')[5].toUpperCase())
      return false;
    else
      return true;*/

    this.getLoggedUserName();

    if (window.location.href.indexOf("login") > -1)
      return false;
    else
      return true;
  }

  getLoggedUserName() {
    if (!this.loggedUName || "" === this.loggedUName)
      this.loggedUName = (localStorage.getItem("UNAME")) ? localStorage.getItem("UNAME").toUpperCase() : "";
  }

  RequestEFric() {
    this.closeNav();
    this.router.navigate(['requestEFric']);
  }

  FIRCAdvice(value) {
    this.closeNav();
    this.dashboardService.setConfig("EXPORT_FIRCADVICE", value);
    this.router.navigate(['eFIRCAdvice']);
  }

  BRCAdvice(value) {
    this.closeNav();
    this.dashboardService.setConfig("EXPORT_BRCADVICE", value);
    this.router.navigate(['eBRCAdvice']);
  }

  ADTransfer(value) {
    this.closeNav();
    this.router.navigate(['billTransfer']);
  }

  OutstandingExportBill() {
    this.closeNav();
    this.router.navigate(['outstandingExportBill']);
  }

  OutstandingImportBill() {
    this.closeNav();
    this.router.navigate(['outstandingImportBill']);
  }

  BRCIssuanceReport() {
    this.closeNav();
    this.router.navigate(['BRCIssuanceReport']);
  }

  FIRCIssuanceReport() {
    this.closeNav();
    this.router.navigate(['FIRCIssuanceReport']);
  }

  PaymentExtension() {
    this.closeNav();
    this.router.navigate(['paymentExtension']);
  }

  InwardRemittanceExtension() {
    this.closeNav();
    this.router.navigate(['InwardRemittanceExtension']);
  }

  ExportBillUtilizationReport() {
    this.closeNav();
    this.router.navigate(['ExportBillUtilizationReport']);
  }

  OutstandingInwardRemittance() {
    this.closeNav();
    this.router.navigate(['OutstandingInwardRemittance']);

  }

  InwardRemittanceUtilizationReport() {
    this.closeNav();
    this.router.navigate(['InwardRemittanceUtilizationReport']);
  }

  OutstandingORM() {
    this.closeNav();
    this.router.navigate(['outstandingORM']);
  }

  BOEExtension() {
    this.closeNav();
    this.router.navigate(['BOEExtension']);
  }

  ORMUtilizationReport() {
    this.closeNav();
    this.router.navigate(['ORMUtilizationReport']);
  }

  ImportBillUtilizationReport() {
    this.closeNav();
    this.router.navigate(['importBillUtilizationReport']);
  }

  IRMAdjustment() {
    this.closeNav();
    this.router.navigate(['IRMAdjustment']);
  }

  BillClosure() {
    this.closeNav();
    this.router.navigate(['billClosure']);
  }

  BOEAdjustment() {
    this.closeNav();
    this.router.navigate(['BOEAdjustment']);
  }

  ORMClosure() {
    this.closeNav();
    this.router.navigate(['ORMClosure']);
  }

  BOEORMMapping() {
    this.closeNav();
    this.router.navigate(['boeormMapping']);
  }

  IRMmapping() {
    this.closeNav();
    this.router.navigate(['IRMmapping']);
  }

  ServiceRequestReport() {
    this.closeNav();
    this.router.navigate(['ServiceRequestReport']);
  }
  
  ServiceRequestReportIDIS() {
    this.closeNav();
    this.router.navigate(['ServiceRequestReportIDIS']);
  }

  ProcessAutomationReport() {
    this.closeNav();
    this.router.navigate(['ProcessAutomationReport']);
  }
  ProcessAutomationReportIDIS() {
    this.closeNav();
    this.router.navigate(['ProcessAutomationReportIDIS']);
  }
  BillLodgement() {
    this.closeNav();
    this.router.navigate(['BillLodgement']);
  }

  OtherBankBOE() {
    this.closeNav();
    this.router.navigate(['OtherBankBOE']);
  }

  WorkflowSetup() {
    this.closeNav();
    this.router.navigate(['WorkflowSetup']);
  }
  
  WorkflowReviewerRequest() {
    this.closeNav();
    this.router.navigate(['WorkflowReviewerRequest']);
  }

  UserMaster() {
    this.closeNav();
    this.router.navigate(['UserMaster']);
  }
  RoleMaster() {
    this.closeNav();
    this.router.navigate(['RoleMaster']);
  }
  RolePageAssociation() {
    this.closeNav();
    this.router.navigate(['RolePageAssociation']);
  }
  logout() {

    this.closeNav();

    var uName: any = this.dashboardService.getConfig("UNAME");

    this.dashboardService.killSession(uName)
      .subscribe(data => {
        this.router.navigate(['']);
      });
  }

  gotoDashboard() {
    var currentTab = this.dashboardService.getConfig("CURRENT_TAB");

    if ("EXPORT" === currentTab)
      this.router.navigate(['dashboard']);
    else
      this.router.navigate(['importDashboard']);
  }
}
----------------------------
dashboard.css
.PendingSubmissionTxtClr {
    color: rgb(92, 107, 192);
    font-size: 16px;
}
.PendingPaymentTxtClr {
    color: rgb(0, 202, 252);
    font-size: 16px;
}
.PartiallyPaidTxtClr {
    color: rgb(238, 82, 80);
    font-size: 16px;
}
.CompletedTxtClr {
    color: rgb(39, 204, 121);
    font-size: 16px;
}
.PendingSubmissionVal,
.PartiallyPaidVal,
.PendingPaymentVal,
.CompletedVal {
    text-decoration: underline;
    cursor: pointer;
    font-size: 18px;
}
.ngui-auto-complete > ul { height: 100px; }

.topMinus1 { top: -1px !important; }

.statusArea {
    height: 47px;
    width: 65%;
}
.PendingSubmissionClr {
    background-color: rgb(92, 107, 192);
}
.PendingPaymentClr {
    background-color: rgb(0, 202, 252);
}
.PartiallyPaidClr {
    background-color: rgb(238, 82, 80);
}
.CompletedClr {
    background-color: rgb(39, 204, 121);
}
.horizontalBar {
    background: -webkit-linear-gradient(left, rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209), rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209));
    /* For Safari 5.1 to 6.0 */

    background: -o-linear-gradient(left, rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209), rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209));
    /* For Opera 11.1 to 12.0 */

    background: -moz-linear-gradient(left, rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209), rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209));
    /* For Fx 3.6 to 15 */

    background: linear-gradient(to right, rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209), rgb(237, 188, 181), rgb(241, 232, 225), rgb(217, 212, 209));
    /* Standard syntax (must be last) */

    width: 100%;
    height: 9px;
}
.chartdiv {
    width: 100%;
    height: 347px;
}
#barChartDiv, #importBarChartDiv {
    width: 90%;
    height: 355px;
    margin-left: 47px;
    /*display: inline-table;*/
}
#barCharSelectorInwardDiv {
    width: 90%;
    height: 355px;
    margin-left: 47px;
    /*display: inline-table;*/    
}
.boxShadow {
    border-radius: 10px;
    box-shadow: 3px 3px 10px #d1d2d3;
    border: 1px solid #D4D4D5
}
.minHeight {
    min-height: 100%;
}
.fullWidth {
    min-width: 100%;
}
@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .is-table-row { display: block !important; }
    #export, #import { width: 156px !important; }
    .iPhoneTotalRecordCount { text-align: center; }
    .iPhonePaddingR0 { padding-right: 0 !important; }
    .iPhonePaddingR10 { padding-right: 10px !important; }
}

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    #export, #import { width: 139px !important; }
    /*.table{ display: block !important; }*/
    .iPhoneTotalRecordCount { text-align: center; }
    .iPhonePaddingR10 { padding-right: 10px !important; }
}



@media only screen 
and (min-width : 768px) 
and (max-width : 1024px) 
and (orientation : portrait)
and (-webkit-min-device-pixel-ratio: 2) {
    #export, #import {
    width: 156px;
}
 }



select, .is-table-row {
    /*display: flex;*/

    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
}
.is-table-row [class*="col-"] {
    /*float: none;*/

    display: table-cell;
    vertical-align: top;
}
h3 {
    white-space: nowrap;
}
.labelH3 {
    /*font-weight: bold;*/

    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    font-size: 24px;
}
.chartLegend {
    color: #fff;
    text-transform: capitalize;
    border-radius: 3px;
    margin-bottom: 10px;
}
.chartLegend1 {
    background-color: #5C6BC0;
      border: 1px solid #5C6BC0;
}
.chartLegend1:hover {
    background-color: #FFF;
    border: 1px solid #5C6BC0;
    color: #5C6BC0;
}
.chartLegend2 {
    background-color: #00CAFC;
     border: 1px solid #00CAFC;
}
.chartLegend2:hover {
    background-color: #FFF;
    border: 1px solid #00CAFC;
    color: #00CAFC;
}
.chartLegend3 {
    background-color: #25A69A;
     border: 1px solid #25A69A;
}
.chartLegend3:hover {
    background-color: #FFF;
    border: 1px solid #25A69A;
    color: #25A69A;
}
.chartLegend4 {
    background-color: #42D28A;
      border: 1px solid #42D28A;
}
.chartLegend4:hover {
    background-color: #FFF;
    border: 1px solid #42D28A;
    color: #42D28A;
}
.legendBody {
    width: 98%;
}
.legendContent {
    /*color: #fff;*/

    line-height: 2.1;
    font-family: 'Roboto-Medium', 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 22px;
}
.chartSecondLegend1 {
    background-color: #EB4079;
      border: 1px solid #EB4079;
}
.chartSecondLegend1:hover {
    background-color: #FFF;
    border: 1px solid #EB4079;
    color: #EB4079;
}
.chartSecondLegend2 {
    background-color: #1E87E4;
     border: 1px solid #1E87E4;
}
.chartSecondLegend2:hover {
    background-color: #FFF;
    border: 1px solid #1E87E4;
    color: #1E87E4;
}
.chartSecondLegend3 {
    background-color: #27CC79;
     border: 1px solid #27CC79;
}
.chartSecondLegend3:hover {
    background-color: #FFF;
    border: 1px solid #27CC79;
    color: #27CC79;
}
.numberFont {
    font-size: 22px;
}
.cursorPointer {
    cursor: pointer;
}
/*
.chartLegend1-border
{
 border: 1px solid #F86161;
}
.chartLegend2-border
{
 border: 1px solid #03A9F3;
}

.chartLegend3-border
{
 border: 1px solid #7166B9;
}
.chartLegend4-border
{
 border: 1px solid #33CEA7;
}*/

#export,
#import {
    width: 159px;
}
#export a,
#export a:hover,
#import a,
#import a:hover {
    text-decoration: none !important;
    font-size: 20px;
}
.legendBody h5 {
    margin-bottom: 5px;
    padding: 0;
    font-weight: normal;
    font-size: 18px;
}
.logout {
    cursor: pointer;
}
/*   Login*/

.loginWrapper {
    height: 430px;
    background-color: #fa6b5b;
    margin-top: 20%;
    color: #fff;
    display: table;
}
.loginWrapperContent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.welcomeSpan1 {
    font-size: 22px;
}
.welcomeSpan2 {
    font-size: 4rem;
}
textarea:focus,
input:focus,
textarea:active,
input:active {
    outline: none;
    box-shadow: none;
}
.loginMain {
    height: 920px;
    background-color: #232C3D;
}
.loginBox2 {
    height: 430px;
    background-color: #fff;
    margin-top: 20%;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 3%;
}
.loginBox2Label {
    font-size: 4rem;
    color: #fa6b5b;
}
#userName,
#password {
    border: none;
    outline: none;
    border-bottom: 1px solid gray;
    width: 100%;
    height: 63px;
    font-size: 24px;
}
/*#password
{    
    margin-bottom:20px;
}*/

.submitBtn, .submitBtn:focus {
    background-color: #fa6b5b;
    color: #fff;
    width: 100%;
    height: 60px;
    font-size: 3rem;
}
control-messages div {
    color: #E82C0C;
    margin: 6px 0;
}
#barChartDiv .amcharts-main-div .amChartsLegend {
    margin-left: 12%;
    /*width: 721px !important;*/
}
.detailsGridInput,
.raiseFIRCInput {
    border: 1px solid #B0B0B0;
    border-radius: 3px;
    height: 35px;
    width: 100%;
    padding-left: 10px;
}
.detailsGridInput{
    text-transform: uppercase;
}
.filterBtn,
.resetBtn {
    font-size: 16px;
    width: 100%;
}

.resetBtn { width: 26%; }

@media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    .resetBtn { width: 31%; }
    /*.table { display: block; }*/

}

@media only screen and (min-width: 768px) and (max-width: 1948px) and (orientation: landscape) {
    .resetBtn { width: 46%; }
    /*.iPhonetable { display: block; }*/
}



.filterBtn,
.filterBtn:active,
.filterBtn:focus,
.filterBtn:active:focus,
.raiseFIRC,
.raiseFIRC:focus,
.FIRCSubmitBtn {
    /*padding: 7px 60px;*/

    padding: 9px 25px 6px 20px;
    background-color: #fa6b5b;
    color: #fff;
}
.raiseFIRC:focus {
    padding: 7px 20px;
}
.filterBtn:hover,
.raiseFIRC:hover,
.FIRCSubmitBtn:hover {
    background-color: #FFF;
    color: #fa6b5b;
    border: 1px solid #fa6b5b;
}
.FIRCSubmitBtn {
    height: 50px;
    font-size: 20px;
    padding: 0;
    width: 100%;
}
.raiseFIRC {
    /*width: 68%;*/
    /*width: 80%;*/

    padding: 7px 20px !important;
}

.update_Btn { padding: 7px 30px !important; }

.resetBtn {
    padding: 7px 0;
    text-align: right;
}
.resetBtn:active,
.resetBtn:focus,
.ebrcDownBtn:active,
.ebrcDownBtn:focus {
    outline: none !important;
    color: fa6b5b;
}
.actionBtn,
.delete,
.actionBtn:focus, .raiseExtensionIcon {
    margin-left: 10px;
    padding: 9px 25px 6px 46px;
    background: url(./../../assets/images/download_1.png) no-repeat;
    color: #fa6b5b;
    background-position: 10px 10px;
}
.raiseExtensionNoIcon
{
   margin-left: 10px;
    /*padding: 9px 25px 6px 46px;*/
    padding: 9px 25px 6px 25px;
   
    /*background-size: 29px 53px;*/

    color: #fa6b5b;
    background-position: 12px 10px; 
}
.boeRaiseExtensionBox
{
    width: 70%;
}

.raiseExtensionBoxOpen { width: 75%; }
.IRMAdjustmentExtensionBox { width:75%; }

.viewLodgementBox { width: 75%; }
.actionBtn:hover {
    background: url(./../../assets/images/download.png) no-repeat;
    background-position: 10px 10px;
}
.delete {
    background: url(./../../assets/images/delete_1.png) no-repeat;
    background-position: 10px;
}
.delete:hover {
    background: url(./../../assets/images/delete.png) no-repeat;
    background-position: 10px;
}
.raiseIcon {
    background: url(./../../assets/images/raise.png) no-repeat;
}
.raiseIcon:hover {
    background: url(./../../assets/images/raise_1.png) no-repeat;
}
.raiseExtensionIcon, .raiseExtensionIcon:active {
    background: url(./../../assets/images/raise_1.png) no-repeat;
}
.raiseExtensionIcon:hover {
    background: url(./../../assets/images/raise.png) no-repeat;
}
.raiseIcon,
.raiseIcon:hover, .raiseExtensionIcon, .raiseExtensionIcon:hover,.raiseExtensionNoIcon:hover,.raiseExtensionNoIcon {
      background-position: 10px;    
   }
.raiseIcon { background-position: 12px 8px; }
/*  Details page CSS*/

.backBtn {
    padding: 7px 30px;
}
.backBtn,
.actionBtn,
.delete, .raiseExtensionIcon, .raiseExtensionIcon:focus,.raiseExtensionNoIcon:focus,.raiseExtensionNoIcon {
    font-size: 18px;
    color: #fa6b5b;
    border-radius: 5px;
    border: 1px solid #fa6b5b;
    background-color: #FFFBF9;
}
.backBtn:hover,
.actionBtn:hover,
.delete:hover, .raiseExtensionIcon:hover,.raiseExtensionNoIcon:hover {
    color: #FFF;
    border: 1px solid #fa6b5b;
    background-color: #fa6b5b;
}
.uploadBtn {
    background: url(./../../assets/images/upload.png) no-repeat;
}
.uploadBtn:hover,
.uploadBtn:focus,
.uploadBtn:active,
.uploadBtn:hover:focus {
    background: url(./../../assets/images/upload_1.png) no-repeat;
}
.uploadBtn,
.uploadBtn:hover,
.uploadBtn:focus,
.uploadBtn:active,
.uploadBtn:hover:focus {
    background-position: 10px;
    padding-left: 38px;
}
.trasferRequestBtn,.RoleMasterBtn,.RoleMasterBtn:active,.RoleMasterBtn:visited,
.uploadBtn,
.trasferRequestBtn:active,
.trasferRequestBtn:visited {
    font-size: 18px;
    color: #FFF !important;
    border-radius: 5px;
    border: 1px solid #fa6b5b;
    background-color: #fa6b5b;
}
.updateBtn
{
    width:110px !important;
}
.trasferRequestBtn:hover,.RoleMasterBtn:hover,
.uploadBtn:hover,
.uploadBtn:active,
.uploadBtn:focus {
    font-size: 18px;
    color: #fa6b5b !important;
    border-radius: 5px;
    border: 1px solid #fa6b5b;
    background-color: #FFFBF9;
}
.trasferRequestBtn { width: 235px; text-align: right; }
.trasferRequestBtn:hover { background-position: 8px 8px; }
.inwardRemittanceDetailsTitle {
    margin: 5px 0;
    font-size: 24px;
}
.searchLabel, .totalRecordCount {
    font-size: 16px;
}
.inwardRemittanceDetailsTitle,
.searchLabel, .totalRecordCount {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    color: #242d3e;
}
.showSearchBtn {
    background-color: #fa6b5b;
    border-radius: 15px;
}
.showFilter,
.showFilter a,
.showFilter a:hover,
.resetBtn,
.resetBtn:hover,
.resetBtn:focus,
.actionBtn {
    font-family: 'Roboto-Medium', 'Roboto', sans-serif;
    font-size: 18px;
    color: #fa6b5b;
    text-decoration: none;
}
.showFilterBgColor {
    background-color: #FFF;
}
.showFilter {
    padding: 10px 20px 10px 5px;
}
.showFilter a:hover {
    text-decoration: none;
}
.addBOEBtn { width: 125px !important; text-align: right; }
/* animation for search box show and hide */

.animate-show-hide.ng-hide {
    opacity: 0;
}
.animate-show-hide.ng-hide-add,
.animate-show-hide.ng-hide-remove {
    transition: all linear 0.5s;
}
.check-element {
    /*border: 1px solid black;*/

    opacity: 1;
    padding: 10px;
}
#gridMaster thead,
#gridDetails thead,
#exportBillsGrid thead {
    background-color: #c8cacf;
}
.searchForm {
    background-color: #fff;
}

#gridMaster thead tr th,
#gridMaster tbody tr td,
.adBillNo,
#gridDetails thead tr th,
#gridDetails tbody tr td,
#exportBillsGrid thead tr th,
#exportBillsGrid tbody tr td {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    font-size: 14 px;
    color: #242d3e;
}

#gridMaster thead tr th,
#gridDetails thead tr th,
#exportBillsGrid thead tr th {
    font-weight: 100;
    padding: 15PX 0;
    padding-left: 10px;
    padding-right: 10px;
    white-space: nowrap;
}

#gridMaster tbody tr,
#gridDetails tbody tr,
#exportBillsGrid tbody tr {
    height: 50px;
}

#gridMaster tbody tr td,
#gridDetails tbody tr td,
#exportBillsGrid tbody tr td {
    vertical-align: middle;
    font-weight: 500;
    padding-left: 10px;
    padding-right: 10px;
}

/*#gridDetails thead tr th { text-align: left; }*/
#gridDetails tbody tr td { 
    /*text-align: left; */
    padding: 15px 10px 10px; }

#gridDetails thead tr th:first-child, #gridDetails tbody tr td:first-child,
#gridMaster thead tr th:first-child, #gridMaster tbody tr td:first-child { padding-left: 20px; }
#gridDetails thead tr th:last-child, #gridDetails tbody tr td:last-child,
#gridMaster thead tr th:last-child, #gridMaster tbody tr td:last-child { padding-right: 20px; }

.table>thead>tr>th {
    vertical-align: middle;
}
.adBillNo,
.adBillNo:hover {
    color: #fa6b5b;
}
.transactionDetails {
    background-color: #666C78;
    border-radius: 6px;
}
.tranDetailsLabel {
    color: #fff;
    font-family: 'Roboto-Medium', 'Roboto', sans-serif;
    font-size: 14px;
}
.tranDetailsField {
    color: #fff;
    font-family: 'Roboto-Medium', 'Roboto', sans-serif;
    font-size: 18px;
}
#svgHover:hover {
    fill: darkslateblue;
}
.amcharts-graph-column {
    cursor: pointer !important;
}
.amcharts-graph-column:hover {
    opacity: 0.8;
}
/*.chartdiv .amcharts-map-image-label, .chartdiv .amcharts-title-main {
  font-family: 'Roboto Condensed','Roboto', sans-serif;
  font-size: 15px!important;
/*}*/

tspan {
    font-size: 16px;
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    font-weight: normal;
}
/*pagination Css*/

.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover {
    z-index: 3;
    color: #000;
    cursor: default;
    background-color: #fff;
    border-radius: 25px;
    border: 1px solid #fa6b5b;
}
.pagination>li>a:focus,
.pagination>li>a:hover,
.pagination>li>span:focus,
.pagination>li>span:hover {
    z-index: 2;
    color: #fff;
    background-color: #fa6b5b;
    border-color: #ddd;
    /*border: 1px solid #fa6b5b;*/

    border-radius: 25px;
    padding: 5px 12px;
    margin-left: 1px;
}
.pagination>li>a,
.pagination>li>span {
    font-family: 'Roboto-Medium', 'Roboto', sans-serif;
    position: relative;
    float: left;
    padding: 5px 12px;
    margin-left: 1px;
    line-height: 1.42857143;
    color: #242d3e;
    text-decoration: none;
    border: none;
    background-color: transparent;
}
.paddingLR14 {
    padding: 6px 14px !important;
}
.pagination>.disabled>a,
.pagination>.disabled>a:focus,
.pagination>.disabled>a:hover,
.pagination>.disabled>span,
.pagination>.disabled>span:focus,
.pagination>.disabled>span:hover {
    background-color: transparent;
    border: none;
}
.overflowAuto {
    overflow: auto !important;
}
/* SIDE MENU - CSS BEGIN HERE */

.sidenav {
    height: 100%;
    overflow: hidden;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #242D3E;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.sidenav a {
    padding: 8px 8px 8px 15px;
    text-decoration: none;
    font-size: 16px;
    color: #fff;
    display: block;
    transition: 0.3s;
}
.sidenav a:hover,
.offcanvas a:focus {
    color: #f1f1f1;
}
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
.closebtn {
    font-size: 36px !important;
}
.sidenav a,
.sidenav a:hover {
    /*font-family: 'Roboto Condensed', 'Roboto', sans-serif;*/

    font-family: 'Roboto Light', 'Roboto', sans-serif;
    font-size: 18px;
}
.listItem {
    color: #90A4AE !important;
}
.listItem:hover {
    color: #FFF !important;
}
.listItem {
    background: url('../images/bullet_1.png') no-repeat 0px 14px;
    /*-webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;*/
    /*background-position: 190px 5px;*/
}
.listItem:hover {
    background: url('../images/bullet_2.png') no-repeat 0px 14px;
}
.listItem,
.listItem:hover {
    /*font-family: 'Roboto Condensed', 'Roboto', sans-serif;*/

    font-family: 'Roboto Light', 'Roboto', sans-serif;
    font-size: 16px;
}
#main {
    transition: margin-left .5s;
}
@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }
    .sidenav a {
        font-size: 18px;
    }
}
.openNav {
    cursor: pointer;
    float: left;
    padding: 9px 10px;
    background-color: #F94A3D;
    margin-top: -9px;
    margin-left: -9px;
}
.list-group-item-success {
    background-color: transparent;
}
a.list-group-item-success:focus,
a.list-group-item-success:hover {
    background-color: #354156;
    color: #FFF;
}
.list-group-item,
.list-group-item:hover {
    border: none;
}
.list-group-item:active {
    background-color: #354156;
}
.panel {
    background-color: #242D3E;
    border: none;
    border-radius: 0px;
    -webkit-box-shadow: none;
    box-shadow: none;
}
a.list-group-item:focus {
    color: #fff;
}
.collapse a {
    background-color: #354156 !important;
}
.collapsing {
    -webkit-transition: none !important;
    transition: none !important;
}
#sideNavImg,
#sideNavImg1, #sideNavImg2 {
    height: 21px;
    width: 21px;
    display: inline-table;
    margin-left: 30%;
}
#sideNavImg1 {
    margin-left: 59%;
}
#sideNavImg2 {
    margin-left: 15%;
}

.downArrow {
    background: url('../images/down.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: 190px 5px;
}
.upArrow {
    background: url('../images/up.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: 190px 5px;
}
#subItem1,
#subItem2, #subItem3, #subItem4,#subItem5 {
    padding-left: 30px;
    background-color: #354156;
}
.list-group-item {
    background-color: transparent;
}
a.list-group-item:hover {
    background-color: #354156;
}

.ebrcDownBtn {
    border-radius: 20px;
    margin-left: 10px;
    padding: 16px;
    background: url(./../../assets/images/ebrcDownBtn.svg) no-repeat #fa6b5b;
    background-size: 100% 100%;
}
.refreshBtn {
     margin-left: 10px;
    padding: 10px;
    background: url(./../../assets/images/refresh.png) no-repeat #fff8f8;
    background-size: 100% 100%;
}
.ebrcDownBtn:active {
    background: url(./../../assets/images/ebrcDownBtn.svg) no-repeat #fa6b5b;
}
.roleBtn{
    background: url(./../../assets/images/role.png) no-repeat 10% #5bfae3;
}
.cancelBtn {
    border-radius: 20px;
    margin-left: 10px;
    padding: 10px;
    background: url(./../../assets/images/cancel.png) no-repeat transparent;
    background-size: 100% 100%;
}

.cancelBtn:active {
    background: url(./../../assets/images/cancel.png) no-repeat transparent;
}
/* SIDE MENU - CSS END HERE */

.modal-dialog {
    margin: 15% auto;
}
/*.raiseFIRCInput {
    padding: 20px 10px;
}*/
.close {
    font-size: 40px;
    font-weight: 200;
}
.close,
.close:hover {
    opacity: 0.8;
}
.btn:focus,
.close:focus {
    outline: none !important;
}
.transferRequestDialog {
    width: 75%;
}
.raiseExtensionBox {
    width: 75%;
}

.viewFIRC, .viewWriteOff, .viewPayment {
    width: 75%;
    margin: 2% auto !important;
}

.IRraiseExtensionBox {
    width: 75%;
}
.paddingL30 
{
    padding-left: 30px !important;
}
.popupBoxWidth98 { width: 75%; }

.exportBilllsTable > thead > tr > th,
.exportBilllsTable > tbody > tr > td {
    width: 5.5%;
}
.actionBtnSize {
    width: 12%;
}
/*.viewSettlementBtnSize {
    width: 44%;
}*/
.hideFileUpload {
    display: none !important;
}
.errorMessage {
    color: red;
}
/******* ERROR HANDLING SECTION - BEGIN HERE *******/
/* Popup container - can be anything you want */

.popup,
.errorBox, .errorBox1 {
    position: relative;
    /*display: inline-block;*/

    /*cursor: pointer;*/
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.errorBox1 {
    /*height: 120px;*/
    height: auto;
    min-height: 50px;
    }
/* The actual popup */

.popup .popuptext,
.errorBox .errorBoxText, .errorBox1 .errorBoxText {
    visibility: visible;
    width: 100%;
    background-color: #C95555;
    color: #fff;
    white-space: normal;
    text-align: initial;
    border-radius: 4px;
    padding: 8px 30px;
    position: absolute;
    top: 5px;
}
.errorBox1 .errorBoxText {height: inherit; text-align: left; padding: 15px 55px;}
.gridSuccessBox {
    background-color: #80A863 !important;
}
.errorBox .errorBoxText {
    text-align: left;
    padding-left: 40px;
}
/* Popup arrow */

.popup .popuptext::after {
    content: "";
    position: absolute;
    top: -21%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #C95555 transparent;
}
.errorImg {
    background: url(./../../assets/images/error.png) no-repeat;
    background-position:2px;
    padding-left: 30px;
    margin-right: 5px; 
   
}
.errorImgNew {
    background: url(./../../assets/images/error.png) no-repeat;
    background-position: 15px 15px;
    padding-left: 30px;
    margin-right: 5px;  
}
.errorImg1 {
    background: url(./../../assets/images/error1.png) no-repeat;
    background-position: 5px;
    padding-left: 30px;
    margin-right: 5px;
}
.successImg {
    background: url(./../../assets/images/success.png) no-repeat;
    background-position: 5px;
    padding-left: 30px;
    margin-right: 5px;
}
.closeImg {
    background: url(./../../assets/images/close.png) no-repeat;
    background-position: 5px;
    padding-left: 30px;
    margin-right: 5px;
}
.errorBox .close,
.errorBox .close:hover {
    line-height: 1.2;
    margin-right: 8px;
    color: #FFF;
    text-shadow: none;
    opacity: 0.9;
}

.btn-default.btn-on.active{background-color: #5BB75B;color: white;}
.btn-default.btn-off.active{background-color: #DA4F49;color: white;}
.btn-default.btn-on.active{background-color: #00D590;color: white;}
.btn-default.btn-off.active{background-color: #A7A7A7;color: white;}

input[type=checkbox] {
    -webkit-appearance: none;
      -ms-appearance: none;
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 9px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
}
input[type=checkbox]:active, input[type=checkbox]:checked:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
}

input[type=checkbox]:checked {
    background-color:#7CB342;
    border: 1px solid #7CB342;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #fff;
}

input[type=checkbox]:checked:after {
    content: '\2714';
    font-size: 14px;
    position: absolute;
    top: 0px;
    left: 3px;
    color: #fff;
}
.star 
{
    color:red;
}
.irmMaster,.irmDetails
{
width: 50%;
}
#actionType
{
    width: 100%;
}
.selectParent select{
    -webkit-appearance: none;
    -moz-appearance: none;
   -ms-appearance: none;
    background: transparent url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right;
    background-position:98%;
}
.popuptext 
{
    font-size: 13px;
}

.tableBlock { display: block; }

.overflowXauto { overflow-x: auto; }

/* Only for IE*/
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
 .selectParent select::-ms-expand { display: none; }
}



/******* ERROR HANDLING SECTION - END HERE *******/
/*==================================================
=            Bootstrap 3 Media Queries             =
==================================================*/
/*==========  Mobile First Method  ==========*/

@media all and (max-width: 359px) and (min-width: 270px) {
    #export, #import {
        width: 100%;
    }
    .actionBtn
    {
        padding: 9px 25px 6px 28px;
    }
    .iPhoneMarginB10 { margin-bottom: 10px; }
    .textAlign
    {
        text-align: center;
    }
    
} 

/*//1400 display block*/
/*@media all and (max-width: 1400px) and (min-width: 270px) {*/
@media all and (min-width: 270px) and (max-width: 1380px) {
    /*.iphoneTable {
    display: block !important;
    } */

}
@media all and (min-width: 1400px) {
    /*.iphoneTable {
    display: table !important;
    }*/

}
@media all and (max-width: 767px) and (min-width: 360px) {
    #export, #import {
        width: 50%;
    }
    .actionBtn
    {
        padding: 9px 25px 6px 33px;
    }
    .iphone6PL14
    {
        padding-left: 14px;
    }
    .iPhoneMarginB10 {
         margin-bottom: 10px;
         }
    .textAlign
    {
        text-align: center;
    }
} 

@media all and (max-width: 991px) and (min-width: 768px) {
    .profile {
        line-height: .99;
    }
} 

@media all and (min-width: 992px) {
    .importpaddingB7P {
        padding-bottom: 8%;
    }
    .paddingB7P {
        padding-bottom: 5%;
    }
    .importpaddingB9P
    {
        padding-bottom: 10%;
    }
    .textAlign
    {
        text-align: right;
    }

} 

@media all and (min-width: 375px) and (max-width: 767px) {
    .iPhoneMarginB10 { margin-bottom: 10px; }
    .textAlign
    {
        text-align: center;
    }
    /*.viewSettlementBtnSize {
    width: 33%;
}*/
}

@media all and (min-width: 768px) and (max-width: 1024px) {
    .iPhoneMarginB10 { margin-bottom: 10px; }
    .textAlign
    {
        text-align: right;
    }
}

.rowFlex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display:         flex;
  flex-wrap: wrap;
}
.rowFlex > [class*='col-'] {
  display: flex;
  flex-direction: column;
}

.userExist { padding: 6px 12px; }

/*==========  Non-Mobile First Method  ==========*/
/* Large Devices, Wide Screens */

@media only screen and (max-width: 1200px) {}
/* Medium Devices, Desktops */

@media only screen and (max-width: 992px) {
    /*.table {
        display: block;
    }*/
    .actionBtnSize {
        width: 27%;
    }
    .resetBtn {
        text-align: center;
    }
}
/* Small Devices, Tablets */

@media only screen and (max-width: 768px) {

}
/* Extra Small Devices, Phones */

@media only screen and (max-width: 480px) {}
/* Custom, iPhone Retina */

@media only screen and (max-width: 320px) {} 

@media only screen 
and (min-width : 270px) 
and (max-width : 667px) {
    .iPhone6MB10 { margin-bottom: 10px; }

    .iPhoneTotalRecordCount { text-align: center; }
    .searchForm .paddingR10,.searchForm .paddingR20
    {
     padding-right:0px !important;
    }
    .searchForm .paddingL10
    {
         padding-left:0px !important;
    }
    .excel
    {
     margin: 5px 0px 0px 0px;
    }
    .raiseExtensionIcon,.actionBtn
    {
        margin: 2px;
    }
}

#chartdiv {
    z-index:10;
}

.loaderDiv {
    z-index: 20;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 2%;
    text-align: center;
    /*opacity: 0.5;*/

    background: transparent;
}
.loader {
    margin-top: 27%;
}

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

i.fa {
    padding-right: 0;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
/*loader css end*/
irmMaster:active, .irmDetails:active, .irmMaster:hover, .irmDetails:hover, .irmMaster:visited, .irmDetails:visited
{
  color:red !important;
  border:1px solid red !important;
  background: #fff !important;
  z-index: 1;
}

.irmMaster, .irmDetails{
color: black !important;
}

/*.amcharts-gauge-arrow-balaji path
{
  
  d:path('M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0') !important;
}
.amcharts-gauge-arrow-balaji circle
{
  r:10 !important;
  cx:100 !important;
  cy:100 !important;
}*/

/*.irmActive
{
background :red !important;
border:1px solid red !important;
 color: #fff !important;
}*/


.selected-list[_ngcontent-c3] .c-list[_ngcontent-c3] .c-token[_ngcontent-c3] { margin-bottom: 5px !important; }
/*.cuppa-dropdown[_ngcontent-c3] { width: 50%; }*/
.roleSection { width: 20%; text-align: left; }

.columnWidth10 { width: 10%; }
.columnWidth20 { width: 20%; }
.columnWidth30 { width: 30%; }

.irmActive
{
    background :#FFF !important;
    border:1px solid red !important;
    color: red !important;
    z-index: 1;
}

.openActive, .open_Active
{
    background :#15900A !important;
    border:1px solid #15900A !important;
    color: #FFF !important;
    z-index: 1;
}

.closeActive
{
    background :#E30B0B !important;
    border:1px solid #E30B0B !important;
    color: #FFF !important;
    z-index: 1;
}

.tranDetailsField
{
word-break: break-word;
}

.modal-body {  overflow-x: auto;  }
     .overflowAutoForModalBody {
         overflow-x: inherit !important;
     }
.RoleMasterBtn
{
    width:80px;
    text-align: right;
}

.selected-list[_ngcontent-c3] .c-btn[_ngcontent-c3] { min-height: 40px; }





/******************* input type range - css begin here ******************/
input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  background: #FA6B5B;
  border-radius: 1.3px;
  border: 0.2px solid #F26A5A;
}
input[type=range]::-webkit-slider-thumb {
  /*box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  border: 1px solid #D35A4B;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;*/

  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  border: 1px solid #D35A4B;
  height: 26px;
  width: 26px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #FF7464;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  background: #FA6B5B;
  border-radius: 1.3px;
  border: 0.2px solid #F26A5A;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  border: 1px solid #D35A4B;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #F26A5A;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
}
input[type=range]::-ms-fill-upper {
  background: #FA6B5B;
  border: 0.2px solid #F26A5A;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #D35A4B, 0px 0px 1px #C95548;
  border: 1px solid #D35A4B;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #FA6B5B;
}
input[type=range]:focus::-ms-fill-upper {
  background: #FF7464;
}
.displayFlex
{
display: inline-flex;
}
.height72
{
    height: 72px;
}
/******************* input type range - css end here ******************/
-------------------------------------------------------
