app.component.html
-----------------
<form [formGroup]="myForm">
      <panel-component [dynamicData]="dynamicData.panelData" [form]="myForm"></panel-component>
</form>

app.component.ts
-----------------
private myForm: FormGroup = new FormGroup({});

constructor(private _fb: FormBuilder, private empService: EmpService) { }
  loadPositions() {
    return this.empService.GetPositions().subscribe(data => {
      this.dynamicData = data;
      this.myForm = this.buildForm(data.panelData);
    },
      error => {
        console.log(error)
      });
  }

buildForm(data) {
    //console.log(data);
    let formGroup = {};
    data.forEach(panel => {
      // console.log(panel.PANEL_CONTENT);
      if (panel.PANEL_CONTENT) {
        panel.PANEL_CONTENT.forEach(content => {
          if (content && content.name) {
            formGroup[content.name] = [''];
          }
        });
      }
    });
    return this._fb.group(formGroup);
  };
----------------------------
  panel.component.ts:
  
  @Input() dynamicData: any;
  @Input() form: FormGroup;
  
panel.component.html:

<div [formGroup]="form">
  <div *ngFor="let pd of dynamicData | orderby: 'PANEL_ORDER'" #parent>
  <div *ngFor="let df of pd.PANEL_CONTENT  | orderby: 'order'" [ngClass]="{'col-md-12': pd.COMP_PER_ROW == 1,'col-md-6': pd.COMP_PER_ROW == 2, 'col-md-4': pd.COMP_PER_ROW == 3, 'col-md-3': pd.COMP_PER_ROW == 4, 'col-md-1': df.type =='label' &&  df.label == '(or)'}"
            class="comp-space">
   <div [ngSwitch]="df.type">
        <div *ngSwitchCase="'textbox'" [style.width.%]="df.compWidth">
          <textbox-component [dynamicData]="df" [form]="form"></textbox-component>
        </div>
   </div>
  </div>
  </div>
</div>  
------------------------
text-box.component.ts:

 @Input() dynamicData: any;
 @Input() form: FormGroup;
 private response: any = "";

text-box.component.html:

  <div [formGroup]="form">
    <label for="">{{dynamicData.label}}</label>
    <input type="text" class=" form-control" [formControlName]="dynamicData.name" [attr.name]="dynamicData.name" [(ngModel)]="response"
    />
</div>
----------------

<ul>
  <li *ngFor="let panel of dynamicData?.DYNAMIC_DATA | orderby:'PANEL_ORDER' ">
    <!-- panel loop starts-->
    {{panel.PANEL_ID}} <br><br> {{panel.PANEL_CONTENT| json}} <br><br>
    <ul>
      <li *ngFor="let panelContent of panel.PANEL_CONTENT">
        <!-- panelContent loop starts-->
        <!-- {{ panelContent | json }}-->
        {{panelContent?.NESTED_PANELS | json}}
        <ul>
          <li *ngFor="let nestedPanel of panelContent?.NESTED_PANELS">
            nestedPanel: {{ nestedPanel.PANEL_CONTENT | json }}
            <ul>
              <li *ngFor="let pcofnestedPanel of nestedPanel?.PANEL_CONTENT">
                {{ pcofnestedPanel | json }}
                <ul>
                  <li *ngFor="let nppcofnestedPanel of pcofnestedPanel?.PANEL_CONTENT">
                    {{nppcofnestedPanel | json}}
                  </li>
                </ul>
              </li>
            </ul>
            <panel-component [dynamicData]="nestedPanel?.PANEL_CONTENT"></panel-component>
          </li>
        </ul>
        <!-- <panel-component [dynamicData]="panelContent.NESTED_PANELS"></panel-component> -->
      </li>
      <!-- panelContent loop ends-->
    </ul>
    <panel-component [dynamicData]="panelContent?.NESTED_PANELS"></panel-component>
  </li>
  <!-- panel loop ends-->
</ul>

---------------------------------------

{
  "DYNAMIC_DATA": [
    {
      "PANEL_TYPE": "Panel",
      "PANEL_ORDER": "1",
      "PANEL_CONTENT": [
        {
          "NESTED_PANELS": [
            {
              "PANEL_ORDER": "2",
              "PANEL_TYPE": "Panel",
              "PANEL_CONTENT": [
                {
                  "COMPNT_VAL": "2",
                  "NXT_SCRN_SEQ": "",
                  "COMP_DATA": "",
                  "REQUIRED": "true",
                  "COMP_TYPE": "Label",
                  "ORDER": "1",
                  "COMP_NAME": "Rev_Lbl_Plc_Count",
                  "COMP_STATE": "E",
                  "SCR_LOC": "PANEL_08",
                  "SCRN_SEQ": "1.10",
                  "COMP_LABL": "Policy Count :"
                }
              ],
              "PANEL_TITLE": "",
              "HAS_BORDER": "YES",
              "SCR_LOC": "PANEL_07",
              "PANEL_ID": "PANEL_08",
              "COMP_PER_ROW": "1"
            }
          ]
        },
        {
          "TABLE_DATA": {
            "TABLE_ROWS": [
              {
                "T_Header_9": "DDGKG47Y008",
                "T_Header_8": "07/28/2017",
                "T_Header_7": "05/23/91",
                "T_Header_5": "SMITH, WILL",
                "T_Header_6": "GREEN AVE, CA",
                "T_Header_10": "54636985",
                "T_Header_3": "C001245",
                "T_Header_11": "08/31/2017",
                "T_Header_4": "CA",
                "T_Header_1": "QSET",
                "T_Header_2": "Long Term Care"
              }
            ],
            "TABLE_COLS": [
              {
                "FIELD": "T_Header_1",
                "ORDER": 1,
                "TYPE": "Label",
                "TITLE": "User"
              },
              {
                "FIELD": "T_Header_2",
                "ORDER": 2,
                "TYPE": "Label",
                "TITLE": "Type of Business"
              },
              {
                "FIELD": "T_Header_3",
                "ORDER": 3,
                "TYPE": "Label",
                "TITLE": "Policy Number"
              },
              {
                "FIELD": "T_Header_4",
                "ORDER": 4,
                "TYPE": "Label",
                "TITLE": "State"
              },
              {
                "FIELD": "T_Header_5",
                "ORDER": 5,
                "TYPE": "Label",
                "TITLE": "Name"
              },
              {
                "FIELD": "T_Header_6",
                "ORDER": 6,
                "TYPE": "Label",
                "TITLE": "Address"
              },
              {
                "FIELD": "T_Header_7",
                "ORDER": 7,
                "TYPE": "Label",
                "TITLE": "DOB"
              },
              {
                "FIELD": "T_Header_8",
                "ORDER": 8,
                "TYPE": "Label",
                "TITLE": "Effective Date"
              },
              {
                "FIELD": "T_Header_9",
                "ORDER": 9,
                "TYPE": "Label",
                "TITLE": "Client ID"
              },
              {
                "FIELD": "T_Header_10",
                "ORDER": 10,
                "TYPE": "Label",
                "TITLE": "Agreement Index ID"
              },
              {
                "FIELD": "T_Header_11",
                "ORDER": 11,
                "TYPE": "Label",
                "TITLE": "Fabricated Date"
              }
            ]
          },
          "TABLE_CONFIG": {
            "SORTABLE": "[PolicyNumber|User]",
            "NAME": "REV_TABLE",
            "SCROLLABLE": "NA",
            "ORDER": "1",
            "ROOT_SEARCH": "true",
            "SELECTABLE": "true",
            "ROW_PER_PAGE": "10",
            "NAVIGATABLE": "true",
            "TYPE": "BASIC_TABLE"
          },
          "COMP_TYPE": "BASIC_TABLE",
          "COMP_NAME": "REV_TABLE",
          "SCR_LOC": "PANEL_07"
        }
      ],
      "SCR_LOC": "",
      "HAS_BORDER": "YES",
      "PANEL_TITLE": "Review Results",
      "PANEL_ID": "PANEL_07",
      "COMP_PER_ROW": "1"
    }
  ]
}
------------------------------
      
      <div *ngIf="showTable" class="col-md-12">
  <div  class="panel panel-default" style="margin-top: 35px; background-color: #ddd;  box-shadow: #ccc 3px 3px;">
      <div *ngIf="tablePanelTitle" class="panel-head text-center" style="margin: 2px;">
          <h2 class="panel-title"> {{ tablePanelTitle }}</h2>
      </div>
      <div  class="text-right">
         <span style="padding: 10px;"> {{tablePanelData?.COMP_LABL}}  {{tablePanelData?.COMPNT_VAL}}</span> 
      </div>
      
      <div class="panel-body">
          <ng-template #dgitContainer></ng-template>
      </div>
  </div>
</div>

         -----------------------
                 loadFabrication_TableData(fabData: any) {
    this.showTable = true;
    this.loaderService.display(true);
    return this._dgitService
      .postFabricationForm(fabData)
      .map(data => {
        data.DYNAMIC_DATA.forEach(panel => {
          this.tablePanelTitle = panel.PANEL_TITLE;
          panel.PANEL_CONTENT.forEach(table => {
            if (table.NESTED_PANELS) {
              this.tablePanelData = table.NESTED_PANELS[0].PANEL_CONTENT[0];
              console.log(this.tablePanelData);
            }
            if (table.COMP_TYPE == 'BASIC_TABLE') {
              this.tableData = data.DYNAMIC_DATA[0].PANEL_CONTENT[1];
              this.loadComponent(TableComponent, this.tableData);
              this.loaderService.display(false);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
        this.loaderService.display(false);
        throw error;
      });
  }
