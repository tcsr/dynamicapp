import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector:'errorpage',
    templateUrl: 'error-page.component.html'
})

export class ErrorPageComponent{
    private errorCode;
    constructor(private router:Router, private route: ActivatedRoute){
        this.route.params.forEach((params: Params) => {
            this.errorCode = params['errorCode'];
        });
    }
}