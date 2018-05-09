<div *ngIf="spinnerFlag">
  <div class="myOverlay text-center">
    <div class="btn btn-static font-xl ">
      <span class="glyphicon glyphicon-refresh rotate"> </span> Processing Request...
    </div>
  </div>
</div>
<div class="grid-section">
  <div class='row'>
    <div class='col-xs-12 col-sm-4 col-md-4 padng_bottom'>
      <label for="sortFilters" class="control_label col-xs-12 col-sm-4 col-md-3">Sort By</label>
      <div class="input-group col-xs-12 col-sm-8 col-md-9 sort-div">
        <select class="form-control" id="sortFilters" (change)="selectSortField($event.target.value)">
          <option *ngFor="let sortFilter of sortColumns" [value]="sortFilter.dataField" [id]="sortFilter.id" [selected]="gridModel.orderBy == sortFilter.dataField">{{sortFilter.columnName}}</option>
        </select>
        <span class="input-group-addon sort-btn">
          <button class="btn btn-default sort-order-btn " id="sortOrder" type="button" (click)="sortOrderClick()">
            <span *ngIf="gridModel.orderType == 'asc'" class="glyphicon glyphicon-sort-by-alphabet"></span>
            <span *ngIf="gridModel.orderType != 'asc'" class="glyphicon glyphicon-sort-by-alphabet-alt"></span>
            <span class="sr-only">Sort Button</span>
          </button>
        </span>
      </div>
    </div>
    <div class='col-xs-12 col-sm-4 col-md-4 text-center sort-page-size padng_bottom'>
      <label class="control_label col-xs-3 col-sm-3 col-md-2" for="showEntries">Show</label>
      <div class="col-xs-2 col-sm-2 col-md-2">
        <select id="showEntries" class="form-control" (change)="showEntriesChange($event.target.value)">
          <option role="option" value=10>10</option>
          <option role="option" value=25>25</option>
          <option role="option" value=50>50</option>
          <option role="option" value=100>100</option>
        </select>
      </div>
      <label class="control_label col-xs-2 col-sm-2 col-md-2">entries</label>
    </div>
    <div class='col-xs-12 col-sm-4 col-md-4 text-right padng_bottom mb-padding pddng-top nextPrevious paginator'>
      <a class="prev-btn" (click)="prevClick()" [class.nextPrevious]="0 === skip  || data===null" [class.pointerDisable]="0 === skip || data===null ">
        <span class="glyphicon glyphicon-chevron-left font-sm"></span> Previous</a>
      <span></span>
      <a class="nxt-btn" (click)="nextClick()" [class.nextPrevious]="0 === skip || data===null " [class.pointerDisable]="this.totalRecords <= showEntries  || data===null">Next
        <span class="glyphicon glyphicon-chevron-right font-sm"> </span>
      </a>
    </div>
  </div>
  <div class="wrapper">
    <p class="serverError" *ngIf="errorMessage">
      {{ errorMessage }}
    </p>
    <div class="row">
      <div class="col-md-12">
        <div *ngIf='gridModel.gridTitle' class="admin-titlebar">
          {{gridModel.gridTitle}}
        </div>
        <div *ngIf='columns.length>0' class="table-responsive ">
          <table class="table " id='gridTable'>
            <thead class="table-header">
              <tr>
                <th *ngFor="let header of columns let colIndex=index" [width]="header.width">
                  <span *ngIf='header.type !=="checkbox"' class="linkcls sorting headertext" (click)="sortByHeader($event,colIndex)">
                    {{header.columnName}}
                    <span class="sr-only">Header column name</span>
                  </span>
                  <span *ngIf='header.type=="checkbox"'>
                    <input [checked]="isAllChecked" (change)="checkAll($event)" type="checkbox" />
                    <span class="sr-only">Header column name</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr *ngFor="let row of data let i=index" [class.highlighted]="i === selectedIndex" (click)="selectRow($event, row, i)">
                <td title="{{row[cols.dataField]}}" *ngFor="let cols of columns  let k=index">
                  <span *ngIf="cols.type=='checkbox'">
                    <input *ngIf="isObraStaff || row['createdBy']==currentUser" type="checkbox" class="selectrow" [checked]="cols.selected==true"
                      (click)='checkSingleRow($event,row)' />
                  </span>
                  <span *ngIf="cols.type=='link'">
                    <a class='underline linkcls' (click)="documentClick($event,row, k)">{{row[cols.dataField]}}</a>
                  </span>
                  <span *ngIf="cols.type=='text'">{{row[cols.dataField]}}</span>
                  <span *ngIf="cols.type=='date'"> {{row[cols.dataField] | date:dateFormat }}</span>
                  <span *ngIf="cols.type=='ssn'"> {{row[cols.dataField] | ssnFormate}}</span>
                  <span *ngIf="cols.type=='customColumns'  && row[cols.dataField]=='R'">Rejected</span>
                  <span *ngIf="cols.type=='customColumns'  && row[cols.dataField] !=='R' " class="customcolumn">
                    <span *ngFor="let cols of customColumns.columns let i=index">
                      <span *ngIf="i == 0">
                        <ng-container *ngTemplateOutlet="template1"></ng-container>
                      </span>
                      <span *ngIf="i == 1">
                        <ng-container *ngTemplateOutlet="template2"></ng-container>
                      </span>
                    </span>
                  </span>
                  <span *ngIf="cols.type=='switchbox'">
                    <label class="switch">
                      <input type="checkbox" class="status-check" (click)="ActiveClick($event,row, k)" [attr.checked]='row[cols.dataField]==="Y"?true:null'>
                      <span class="slider round">
                        <span class="sr-only">checkbox</span>
                      </span>
                    </label>
                  </span>
                  <span *ngIf="cols.type ==='appeals' && row[cols.dataField] !== null" class="fa fa-gavel fa-fw button-icon"></span>
                  <span *ngIf="cols.type ==='status' && row[cols.dataField]=='Past Due'" class="fa fa-certificate fa-lg text-danger"></span>
                  <span *ngIf="cols.type ==='status' && (row[cols.dataField]=='Rejected' || row[cols.dataField]=='Counter Signee Rejected')"
                    class="fa fa-times-circle fa-lg text-danger"></span>
                  <span *ngIf="cols.type ==='status' && (row[cols.dataField]=='Rejected (Pending)' || row[cols.dataField]=='Counter Signee Rejected (Pending)')"
                    class="fa fa-times-circle-o fa-lg text-warning"></span>
                  <span *ngIf="cols.type ==='status' && (row[cols.dataField]=='Assigned (Pending)' || row[cols.dataField]=='Partially Completed (Pending)')"
                    class="fa fa-exclamation-triangle fa-lg text-warning"></span>
                  <span *ngIf="cols.type ==='status' && row[cols.dataField]=='10'" class="fa fa-lg fa-sign-out text-danger" title='pending in process'></span>
                  <span *ngIf="cols.type ==='status' && row[cols.dataField]=='5'" class="fa fa-lg fa-sign-in text-success" title='returned from CMH'></span>
                  <span *ngIf="cols.type =='validate' && row[cols.dataField]===1">Notification</span>
                  <span *ngIf="cols.type =='validate' && row[cols.dataField]===2">outage</span>
                  <span *ngIf="cols.type =='validate' && row[cols.dataField]===3">survey</span>
                </td>
              </tr>
              <tr class="NoData" *ngIf="(data=='')">
                <td [attr.colspan]="columns.length" class="no_border">No data available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>



import { Component, OnInit, TemplateRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { GridModel } from './GridModel';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../../Service/webservice';
import { ActivatedRoute } from '@angular/router';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalService } from '../../Service/modal.service';
import { dateFormat } from '../../JSON';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.css']
})
export class AppGridComponent implements AfterViewInit, OnChanges {
  @Input() configUrl: string;
  @Input() dataUrl: string;
  @Input() customColumns: any;
  @Input() template1: TemplateRef<any>;
  @Input() template2: TemplateRef<any>;
  @Input() searchInput: any;
  @Input() resetSubject: Subject<any>;
  gridModel: GridModel;
  data: any;
  errorMessage: string;
  spinnerFlag: boolean;
  private key: any;
  private selectedRow: any;
  private selectedIndex: any;
  skip: number;
  showEntries: number;
  private id;
  private sub;
  totalRecords: number;
  private messageObj: any = {};
  private dateFormat: any;
  private serviceData: any;
  columns: any = [];
  sortColumns: any = [];
  private url: any = [];
  private gridDataFlag: boolean;
  selectedAll: any;
  reset: boolean;
  isAllChecked: boolean;
  evaluationDocuments: any = [];
  evaluationDocumentsSelected: any = [];
  isObraStaff: boolean;
  currentUser: any;
  @Output() message: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyDocuments: EventEmitter<any> = new EventEmitter<any>();
  @Output() ActiveDocument: EventEmitter<any> = new EventEmitter<any>();
  @Output() recordSet: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyDeleteDocuments: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient, private httpService: WebService, private Activatedroute: ActivatedRoute,
    private modalService: ModalService, private router: Router, private platformLocation: PlatformLocation) {
    this.gridModel = new GridModel();
    this.spinnerFlag = false;
    this.skip = 0;
    this.skip = 0;
    this.showEntries = 10;
    this.dateFormat = dateFormat;
    this.gridDataFlag = false;
    this.selectedAll = false;
    this.reset = false;
    this.isAllChecked = false;

  }
  ngAfterViewInit() {
    this.reset = false;
    this.sub = this.Activatedroute.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.url = this.router.url.split('/');
      if (this.url[2] !== 'consumer-dashboard' && !this.gridDataFlag) {
        this.readJsonConfig();
      }
    });
  }
  ngOnChanges() {
    this.reset = false;
    if (this.resetSubject !== undefined) {
      this.resetSubject.subscribe(event => {
        if (event === 'reset') {
          if (!this.reset) {
            this.readJsonConfig();
            this.reset = true;
          }
        }
      });
    }
    this.url = this.router.url.split('/');
    if (this.url[2] === 'consumer-dashboard' || this.url[2] === 'evaluationdashboard') {
      this.readJsonConfig();
      this.gridDataFlag = true;
    }
  }
  readJsonConfig() {
    if(this.configUrl != undefined){
      this.columns = [];
      this.sortColumns = [];
      this.isObraStaff = this.httpService.isObraStaff();
      this.currentUser = sessionStorage.getItem('currentUser');
      // // this.http.get('/obra/assets/Jsons/' + this.configUrl)
      // this.http.get('/assets/Jsons/' + this.configUrl)
      this.http.get((this.platformLocation as any).location.pathname + 'assets/Jsons/' + this.configUrl)
        .subscribe(response => {
          this.gridModel.gridTitle = response['gridTitle'];
          this.gridModel.columns = response['columns'];
          for (let i = 0; i < this.gridModel.columns.length; i++) {
            this.columns.push(this.gridModel.columns[i]);
            if (this.gridModel.columns[i].sort) {
              this.sortColumns.push(this.gridModel.columns[i]);
            }
          }
          this.columns.forEach(x => x.selected = false);
          this.gridModel.orderBy = response['orderBy'];
          this.gridModel.orderType = response['orderType'];
          this.searchInput.orderBy = this.gridModel.orderBy;
          this.searchInput.orderType = this.gridModel.orderType;
          this.RefreshAgneciesModal();
      });

    }
  }

  RefreshAgneciesModal() {
    this.data = [];
    this.evaluationDocuments = [];
    if (!this.reset) {
      this.gridModel.startIndex = this.skip * this.showEntries;
      this.gridModel.maxRows = this.showEntries;
      this.serviceData = {
        'max': this.gridModel.maxRows,
        'skip': this.gridModel.startIndex,
        'orderBy': this.gridModel.orderBy,
        'orderType': this.gridModel.orderType,
        'search': this.searchInput.search
      };
      if (this.serviceData.search) {
        this.spinnerFlag = true;
        this.httpService.getRecordList(this.dataUrl, this.serviceData).subscribe(res => {
          this.messageObj = res;
          this.messageObj.data = res.data;

          this.message.emit(this.messageObj);
          if (res.global === 'successMsg@') {
            this.spinnerFlag = false;
            this.totalRecords = res.data.length;
            if (this.totalRecords > this.showEntries) {
              this.data = res.data.slice(0, this.showEntries);
            } else {
              this.data = res.data;
            }
            this.recordSet.emit(res.data);
          } else {
            this.spinnerFlag = false;
          }
        }, error => {
          this.spinnerFlag = false;
          this.errorMessage = error;
        });
      }
    }
  }
  selectRow(event: any, item: any, selectedIndex: any) {
    this.selectedRow = item;
    this.selectedIndex = selectedIndex;
    this.notify.emit({ event, item });
  }

  selectSortField(value: any) {
    this.gridModel.orderBy = value;
    this.RefreshAgneciesModal();
    this.searchInput.orderBy = this.gridModel.orderBy;
    this.searchInput.orderType = this.gridModel.orderType;
  }

  sortOrderClick() {
    this.skip = 0;
    if (this.gridModel.orderType === 'asc') {
      this.gridModel.orderType = 'desc';
    } else {
      this.gridModel.orderType = 'asc';
    }
    this.searchInput.orderBy = this.gridModel.orderBy;
    this.searchInput.orderType = this.gridModel.orderType;
    this.RefreshAgneciesModal();
  }
  documentClick(event: any, item: any, selectedIndex: any) {
    if (selectedIndex > -1) {
      item.selectedIndex = selectedIndex;
    } else {
      item.selectedIndex = '';
    }
    this.notifyDocuments.emit({ event, item });
  }
  ActiveClick(event: any, item: any, selectedIndex: any) {
    this.ActiveDocument.emit({ event, item });
  }
  checkAll(ev) {
    this.evaluationDocuments = [];
    if (ev.target.checked) {
      if (this.messageObj.data.evaluationDocumentsId !== null || undefined) {
        for (let i = 0; i < this.messageObj.data.length; i++) {
          if (this.messageObj.data[i].createdBy === this.currentUser || this.isObraStaff) {
            this.evaluationDocuments.push(this.messageObj.data[i].evaluationDocumentsId);
          }
        }
        this.columns.forEach(x => x.selected = true);
      }
      this.isAllChecked = true;
    } else {
      this.isAllChecked = false;
      this.columns.forEach(x => x.selected = false);
    }
    this.notifyDeleteDocuments.emit(this.evaluationDocuments);
  }
  checkSingleRow(ev: any, row: any) {
    const index = this.evaluationDocuments.indexOf(row.evaluationDocumentsId);
    if (ev.target.checked) {
      if (index < 0) {
        this.evaluationDocuments.push(row.evaluationDocumentsId);
      }
    } else {
      this.isAllChecked = false;
      if (index > -1) {
        this.evaluationDocuments.splice(index, 1);
      }
    }
    this.notifyDeleteDocuments.emit(this.evaluationDocuments);
  }
  showEntriesChange(value: any) {
    this.skip = 0;
    this.showEntries = value;
    this.RefreshAgneciesModal();
  }

  prevClick() {
    if (this.skip > 0) {
      this.skip = this.skip - 1;
    }
    this.RefreshAgneciesModal();
  }

  nextClick() {
    this.skip = this.skip + 1;
    this.RefreshAgneciesModal();
  }
  sortByHeader(event: any, colIndex: any) {
    const element = event.target || event.srcElement;
    if (element.classList.contains('sorting')) {
      element.classList.remove('sorting');
      element.classList.add('sorting_asc');
      this.gridModel.orderType = 'asc';
    } else if (element.classList.contains('sorting_asc')) {
      element.classList.remove('sorting_asc');
      element.classList.add('sorting_desc');
      this.gridModel.orderType = 'desc';
    } else if (element.classList.contains('sorting_desc')) {
      element.classList.remove('sorting_desc');
      element.classList.add('sorting_asc');
      this.gridModel.orderType = 'asc';
    }
    this.gridModel.orderBy = this.gridModel.columns[colIndex].dataField;
    this.RefreshAgneciesModal();
  }
}
