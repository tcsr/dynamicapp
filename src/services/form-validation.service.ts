import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { GLOBAL_CONSTANTS } from '../config/globals.ts'
@Injectable()
export class FormValidationService {  

    buildFormControl(question) {
        let validationArray: any = [];
        let formControl: any = {};

        if (question.type == 'text' || question.type == "textarea" || question.type == "email") return this.textValidation(question, validationArray, formControl);

        if (question.type == "date") return this.dateValidation(question, validationArray, formControl);

        if (question.type == "radio") return this.radioValidation(question, validationArray, formControl);

        if (question.type == "checkbox") return this.checkBoxValidation(question, validationArray, formControl);

        if (question.type == "dropdown") return this.dropdownValidation(question, validationArray, formControl);
        
        if (question.type == "search") return this.searchValidation(question, validationArray, formControl);

    }

    // required Validation
    requiredValidation(control: FormControl) {
        return (control.value != "" && control.value != null) ? null : { required: true }
    }

    //Validation for Text,Email,Password, Component
    textValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.requiredValidation);
        }
        if (parameters.charLimit) {
            validationArray.push(Validators.maxLength(question.params.charLimit));
        }else{
            question.type == 'textarea' ? validationArray.push(Validators.maxLength(GLOBAL_CONSTANTS.textareaLength)):''; 
        }
        //Email validation
        if (parameters && parameters.validation && parameters.validation.type == 'email') {
            validationArray.push(Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"));
        }
        //regular expression validation
        if (parameters && parameters.validation && parameters.validation.type == 'regex') {
            validationArray.push(Validators.pattern(question.params.validation.pattern));
        }
        //Alpha numeric validation
        if (parameters && parameters.validation && parameters.validation.type == 'alphanumeric') {
            validationArray.push(Validators.pattern("^[a-zA-Z0-9]*$"));
        }
        //Phone validation    
        if (parameters && parameters.validation && parameters.validation.type == 'phone') {
            validationArray.push(Validators.pattern("\\d{10}"));
        };
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }
        
    //Validation for Search Component
    searchValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.requiredValidation);
        }
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }

    //Validation for Dropdown Component
    dropdownValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.requiredValidation);
        }
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }

    //Validation for CheckBox Component
    checkBoxValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.requiredValidation);
        }
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }


    //Validation of Radio Component
    radioValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.requiredValidation);
        }
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }

    //Validation for Date Component
    dateValidation(question, validationArray, formControl) {
        let parameters = question.params;
        if (parameters && (parameters.required && parameters.required == "yes" || parameters.required == 'conditional' && parameters.conditions[0].required == "yes")) {
            validationArray.push(this.validDateCheck);
            validationArray.push(this.requiredValidation);
        }
        formControl = new FormControl('', Validators.compose(validationArray));
        this.questionGroup[question.questionSequenceCode] = formControl
        return formControl;
    }
    validDateCheck(control: FormControl) {
        let value = control.value.toString();
        let dateString = (value.length <= 10) ? value : new Date(control.value);
        let dateToValid = (value.length > 10) ? (dateString.getMonth() + 1 + '-' + dateString.getDate() + '-' + dateString.getFullYear()) : value;
        return (FormValidationService.isValidDate(dateToValid) || control.value == '') ? null : { validDateCheck: true }
    }

    private static isValidDate(dateString: any) {
        if (!dateString) return false;
        // First check for the pattern
        if (!dateString.match(/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }
    
    //Question Controls group
    private questionGroup : any = {}
    public getQuestionControl(id:any){
        return this.questionGroup[id];    
    }
}