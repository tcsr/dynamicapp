{
    "MessageContent": [
        {
            "MessageLevel": "success",
            "MessageKey": "default",
            "Message": "New Password Saved"
        },
        {
            "MessageLevel": "success",
            "MessageKey": "length",
            "Message": "Registration Complete"
        },
        {
            "MessageLevel": "error",
            "MessageKey": "default",
            "Message": "There was a problem changing your password. Please try again."
        },
        {
            "MessageLevel": "error",
            "MessageKey": "length",
            "Message": "Account has been locked after 3 unsuccessful attempts."
        },
        {
            "MessageLevel": "error",
            "MessageKey": "invalid",
            "Message": "The username and password is invalid."
        }
    ],
    "HeaderContent": null,
    "BodyContent": {
        "FormContents": [
            {
                "Key": "username_label",
                "Type": "form",
                "Label": "Username",
                "Messages": [
                    {
                        "MessageLevel": "info",
                        "MessageKey": "default",
                        "Message": "Enter #labelname here"
                    },
                    {
                        "MessageLevel": "error",
                        "MessageKey": "empty",
                        "Message": "#labelname is required"
                    }
                ]
            },
            {
                "Key": "password_label",
                "Type": "form",
                "Label": "Password",
                "Messages": [
                    {
                        "MessageLevel": "info",
                        "MessageKey": "default",
                        "Message": "Enter #labelname here"
                    },
                    {
                        "MessageLevel": "error",
                        "MessageKey": "empty",
                        "Message": "#labelname is required"
                    }
                ]
            }
        ],
        "HtmlContents": null,
        "TextContents": [
            {
                "Key": "login_title_text",
                "Type": "text",
                "Text": "Sign in to Reward Center"
            },
            {
                "Key": "login_registration_msg",
                "Type": "text",
                "Text": "Do you have an account?"
            },
            {
                "Key": "sign_in_button_text",
                "Type": "text",
                "Text": "Sign In"
            }
        ],
        "ImageContents": null,
        "HyperlinkContents": [
            {
                "Key": "forgot_password_link",
                "Type": "link",
                "OpenLinkInNewWindow": false,
                "PartialURL": true,
                "LinkText": "Forgot Password?",
                "LinkURL": "/#/forgotpass"
            },
            {
                "Key": "register_link",
                "Type": "link",
                "OpenLinkInNewWindow": false,
                "PartialURL": true,
                "LinkText": "Register",
                "LinkURL": "/#/register"
            }
        ],
        "EmailContents": null,
        "OfferContents": null
    },
    "FooterContent": null
}

------------------

 loginPageData: any = {};
  formContents: any = [];
  textContents: any = [];
  hyperLinkContents: any = [];
  messageContents: any = [];

  login_text_loginTabLable;
  login_field_userName;
  login_field_password;
  login_page_username_validation_msg;
  login_page_password_validation_msg;
  login_button_submit = _.unescape('Sign In');
  login_button_register;
  
  
  
  
   if (result) {
          this.loginPageData = result;
          this.formContents = this.loginPageData.BodyContent.FormContents;
          this.textContents = this.loginPageData.BodyContent.TextContents;
          this.hyperLinkContents = this.loginPageData.BodyContent.HyperlinkContents;
          this.messageContents = this.loginPageData.MessageContent;

          this.login_text_loginTabLable = this.textContents[0].Text;
          this.login_field_userName = this.formContents[0].Label;
          this.login_field_password = this.formContents[1].Label;
          this.login_page_username_validation_msg = this.formContents[0].Messages[1].Message;
          this.login_page_password_validation_msg = this.formContents[1].Messages[1].Message;
          this.login_button_register = this.textContents[2].Text;

        } else {

        }
        
        ----
        
        getCarouselContent(texts){
    texts.content_texts.filter(element =>{
      if(element.view_all_url_text){
        this.viewAll = element.view_all_url_text;
      }
      if(element.view_all_url){
        this.viewAllUrl = element.view_all_url;
      }
      if(element.sale_text){
        this.saleText = element.sale_text;
      }
    });
  }


----------------------------------------------------------------
html
---------------
<div>
  <mat-card>
    <form [formGroup]="loginForm">
      <mat-form-field class="full-width">
        <label for="phoneNumber"></label>
        <input type="text" phone id="phoneNumber" formControlName="phoneNumber" matInput placeholder="Phone Number" />
      </mat-form-field>
      <mat-form-field class="full-width">
        <label for="ssn"></label>
        <input [type]="showPassword ? 'text' : 'password'" ssn id="ssn" maxlength="11" formControlName="ssn" matInput placeholder="SSN"
        />
      </mat-form-field>
      <button (click)="submit()">Submit</button>
    </form>

    <div>
      <a href="javascript:void(0)" [class.adisabled]="showPassword == true" (click)="showPassword = true"> Show </a> |
      <a href="javascript:void(0)" [class.adisabled]="showPassword == false" (click)="showPassword = false">
        Hide </a>
    </div>

    <mat-card-content>
      <pre>{{ arrayObject | groupBy: 'elm' | json }}</pre>
      <div *ngFor="let obj of arrayObject | groupBy: 'elm'">
        <!-- <div>{{obj.key}} has {{obj.value.length}} objects</div> -->
        <mat-card>
          <mat-card-header>
            {{obj.key}}
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let val of obj.value">
              <mat-card>
                <div>
                  Id: {{val.id}}
                </div>
                <div>
                  Element: {{val.elem}}
                </div>
                <div>
                  Value: {{val.value}}
                </div>
              </mat-card>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </mat-card-content>
  </mat-card>
</div>
----------------------------------------------------------------------------------------------------------
ts
-----------------------	

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword: boolean = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  arrayObject = [
    { id: 1, elm: 'foo', value: 0 },
    { id: 2, elm: 'bar', value: 1 },
    { id: 3, elm: 'foo', value: 2 },
    { id: 4, elm: 'foo', value: 2 },
    { id: 5, elm: 'bar', value: 5 },
  ];

  ngOnInit() {
    this.loginForm = this.fb.group({
      'phoneNumber': [''],
      "ssn": ['', Validators.pattern(/^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/)]
    })
  }

  submit() {
    console.log(this.loginForm.controls);
    this.loginForm.value['phoneNumber'] = this.loginForm.value['phoneNumber'].replace(/\D+/g, '');
    this.loginForm.value['ssn'] = this.loginForm.value['ssn'].replace(/\D+/g, '');
    console.log(this.loginForm.value);
  }

}


----------------------------------------------------------------------------------------------------------
scss
-----
a.adisabled {
    cursor: not-allowed;
    opacity: .65;
    text-decoration: none;
    color:#777;
  }
  
  a.adisabled:hover { text-decoration: none; }
  a.adisabled:focus { text-decoration: none; }
  a.adisabled:active { text-decoration: none; }

----------------------------------------------------------------------------------------------------------
Groupby pipe:
--------------

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
  transform(value: Array<any>, field: string): Array<any> {
    const groupedObj = value.reduce((prev, cur)=> {
      if(!prev[cur[field]]) {
        prev[cur[field]] = [cur];
      } else {
        prev[cur[field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
  }
}

----------------------------------------------------------------------------------------------------------
SSN Mask:
---------

import { Directive, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][ssn]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value,true)'
  }
})
export class SSNMaskDirective {
  constructor(public model: NgControl) { }
  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();
  onInputChange(event, backspace) {
    var newVal = event.replace(/\D/g, '');
    var rawValue = newVal;

    if (backspace) {
      newVal = newVal.substring(0, newVal.length);
    }

    if (newVal.length == 0) {
      newVal = '';
    }
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    }
    else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1-$2');
    }
    else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(\d{0,4})/, '$1-$2-$3')
    }
    this.model.valueAccessor.writeValue(newVal);
    this.rawChange.emit(rawValue);
  }
}

----------------------------------------------------------------------------------------------------------
Phone Mask:
-----------

import { Directive, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class PhoneMaskDirective {

  constructor(public model: NgControl) { }

  @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

  onInputChange(e, backspace) {

    var x = e.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    // set the new value
    this.model.valueAccessor.writeValue(e);
    this.rawChange.emit(e);
  }

}

----------------------------------------------------------------------------------------------------------







