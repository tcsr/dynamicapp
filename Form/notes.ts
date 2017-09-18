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
