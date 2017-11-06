import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { CanectService } from './../../services/index';

@Component({
  selector: 'canect-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  organizations: any = [];
  fleets: any = [];
  assets: any = [];
  selectedOrganizations: any = [];
  selectedFleets: any = [];
  selectedAssets: any = [];

  filteredArray: any = [];

  constructor(private _canectService: CanectService) {

  }

  ngOnInit() {
    this.loadOrganizations();
  }


  loadOrganizations() {
    return this._canectService.getData('assets/organizations.json').subscribe(data => {
      this.organizations = data;
    },
      error => {
        console.log(error)
      });
  }

  loadFleets(selectedItems) {
    return this._canectService.getData('assets/fleets.json').subscribe(data => {
      if (selectedItems == "Organization1") {
        this.fleets = data[0].FLEET1;
      }
      else if (selectedItems == "Organization2") {
        this.fleets = data[1].FLEET2;
      }
      else if (selectedItems == "Organization3") {
        this.fleets = data[2].FLEET3;
      }
      else if (selectedItems == "Organization4") {
        this.fleets = data[3].FLEET4;
      } else if (selectedItems == "Organization5") {
        this.fleets = data[4].FLEET5;
      }
      else {
        this.fleets = [];
      }
    },
      error => {
        console.log(error)
      });
  }

  loadAssets(selectedItems) {
    return this._canectService.getData('assets/assets.json').subscribe(data => {
      if (selectedItems == "Organization1") {
        this.assets = data[0].ASSET1;
      }
      else if (selectedItems == "Organization2") {
        this.assets = data[1].ASSET2;
      }
      else if (selectedItems == "Organization3") {
        this.assets = data[2].ASSET3;
      }
      else if (selectedItems == "Organization4") {
        this.assets = data[3].ASSET4;
      } else if (selectedItems == "Organization5") {
        this.assets = data[4].ASSET5;
      }
      else {
        this.assets = [];
      }
    },
      error => {
        console.log(error)
      });
  }

  onOrganizationSelect(selectedItems) {
    console.log(selectedItems)
    if (selectedItems) {
      this.loadFleets(selectedItems);
      this.loadAssets(selectedItems);
    }
    else {
      this.fleets = [];
      this.assets = [];
    }
  }


  clearFilter() {
    this.selectedOrganizations = [];
    this.selectedFleets = [];
    this.selectedAssets = [];
    this.filteredArray = [];
    this.fleets = [];
    this.assets = [];
  }

  applyFilter() {
    this.filteredArray.push(this.selectedOrganizations, this.selectedFleets, this.selectedAssets);
  }

}
