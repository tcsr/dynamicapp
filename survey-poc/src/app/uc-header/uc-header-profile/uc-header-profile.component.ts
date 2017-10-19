import {Component} from '@angular/core';

@Component({
  selector: 'uc-header-profile',
  template: `
    <a href="" (click)="toggleMenu()" class="toggle"><span class="uc-user"><span class="hide-text">toggle</span></span></a>
    <md-card *ngIf="isMenuOpen">
      <div class="user-details">
        <strong>Janakinath</strong>
        <div>janakinath1061@gmail.com</div>
      </div>
      <!--md-card-actions>
        <a href=""><span class="uc-profile"></span>Profile</a>
        <a href=""><span class="uc-signout"></span>Sign Out</a>
      </md-card-actions-->
    </md-card>
  `,
  styleUrls: ['uc-header-profile.component.scss']
})
export class UcHeaderProfileComponent {

}
