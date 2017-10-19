import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UcHeaderProfileComponent } from './uc-header-profile/index';
import { UcHeaderTileComponent } from './uc-header-tile/index';


@Component({
  selector: 'uc-header',
  template: `
    <md-toolbar color="rss">
      <div class="hamburger"><span class="hide-text">hamburger</span></div>
      <div class="name"><a  routerLink='/menu'>Flexible Questionaire</a></div>
      <uc-header-tile></uc-header-tile>
      <uc-header-profile></uc-header-profile>
    </md-toolbar>
  `,
  styleUrls: ['uc-header.component.scss']
})
export class UcHeaderComponent{
  
}
