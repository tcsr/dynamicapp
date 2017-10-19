import {Component} from '@angular/core';

@Component({
  selector: 'uc-header-tile',
  template: `
    <a href="" (click)="toggleMenu()" class="toggle"><span class="glyphicon glyphicon-th"><span class="hide-text">toggle</span></span></a>
    <md-card *ngIf="isMenuOpen">
      <div class="flex">
        <a href=''>
          Tiles
        </a>
      </div>
      <md-card-actions>
        <a href=''><span class="uc-help"></span>Help</a>
      </md-card-actions>
    </md-card>
  `,
  styleUrls: ['uc-header-tile.component.scss']
})
export class UcHeaderTileComponent{

}
