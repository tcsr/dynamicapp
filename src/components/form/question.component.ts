import { Component, Input, OnInit, EventEmitter} from '@angular/core';
import { QuestionnaireControls } from './questionnaire-controls';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { FormValidationService } from './../../services/index';
import { MODE } from '../../config/globals.ts';

@Component({
  selector: 'question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.scss']
})
export class QuestionComponent {
    @Input() question: any;
    @Input() sectionGroup : any;
    @Input() sectionId : any;
    @Input() isSubmitClicked:any;
    @Input() mode:string;
    
    private displayQuestion = true;
    private responseControl = {};
    private control : any = new FormControl('');
    private controlObject : any = {};
    private controlCollection : any = {};
    
    private submitClickedSubscription:Subscription;
    
    constructor(private _formValidationService:FormValidationService){}
    getResponse(event){}
    
    ngOnInit(){
        if(this.mode == MODE.EDIT ||  this.mode == MODE.AMEND){
            this.controlObject = this.getControl(this.question.questionSequenceCode);
            this.control = this._formValidationService.getQuestionControl(this.question.questionSequenceCode);
            let parameters = this.question.params;           
            if(this.control){
                this.control["readOnly"] = false;
            }
            if(parameters.required == 'conditional'){
                parameters.conditions.forEach(condition =>{
                    this.handleBehaviorOfConditionalQuestion(false, condition.behaviors);                    
                    condition.questions.forEach(question => {
                        let control = this._formValidationService.getQuestionControl(question.questionSequenceCode);  
                        this.controlCollection[question.questionSequenceCode] = control; 
                        this.evaluateConditions(condition, this.controlCollection);
                        control.valueChanges.subscribe(response =>{
                        this.evaluateConditions(condition, this.controlCollection);    
                        });      
                    });       
                });     
            }
        }
        else {
            this.controlObject = this.getControl(this.question.questionSequenceCode);
            this.control = this._formValidationService.getQuestionControl(this.question.questionSequenceCode);
            if(this.control){
                this.control["readOnly"] = true;
            }
            
            if(this.question.params.required == 'conditional' && this.question.iterations && this.question.iterations[0].responseText == null) this.displayQuestion = false;
       }                     
    }
    
    //evaluate conditions
    evaluateConditions(condition:any, controls){
        let isConditionSatisfy = true;
        condition.questions.forEach(question => {
            if(question.responses.length>1){
                let isControlValid = false;
                for(let i =0 ; i < question.responses.length ; i++){  
                    if(controls[question.questionSequenceCode]){
                        if (controls[question.questionSequenceCode].value.split('|').indexOf(question.responses[i]) != -1){ isControlValid = true; break;}
                    }
                }
                isConditionSatisfy = isConditionSatisfy && isControlValid;
            }else {
                 if(controls[question.questionSequenceCode] && controls[question.questionSequenceCode].value){
                         isConditionSatisfy = isConditionSatisfy && (controls[question.questionSequenceCode].value.toLowerCase() == question.responses[0].toLowerCase());
                  }else{
                      isConditionSatisfy = false;
                  }
            }        
        });
        this.handleBehaviorOfConditionalQuestion(isConditionSatisfy,condition.behaviors);   
    }
    
    getControl(code){
        let control = {};
        this.sectionGroup.controls.responses.controls.forEach(response => {
            if(response.controls.questionSequenceCode.value == code){
                control = response;
            }    
        }) 
        return control;        
    }
    
    //method to deal with behaviors
    handleBehaviorOfConditionalQuestion(isConditionsSatisfy:boolean, behaviors:any){        
        behaviors.forEach( behavior => {
            if(behavior == "show"){
                this.displayQuestion = isConditionsSatisfy;
                if(!this.displayQuestion){
                    this.sectionGroup.controls.responses.controls.forEach(response => {
                        if(response.controls.questionSequenceCode.value == this.question.questionSequenceCode){                            
                            this.responseControl = response;
                            this.control.setValue("");
                            this.sectionGroup.controls.responses.controls.splice(this.sectionGroup.controls.responses.controls.indexOf(response),1);
                        }    
                    }) 
                }
                else {
                    this.responseControl["response"] = this.control;
                    if(this.sectionGroup.controls.responses.controls.indexOf(this.responseControl) == -1)
                    this.sectionGroup.controls.responses.push(this.responseControl);   
                }                     
            } 
        });          
    }
}
