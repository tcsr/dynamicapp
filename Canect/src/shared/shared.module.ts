import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Kendo - Modules
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

// PrimeNG - Modules
import { MultiSelectModule } from 'primeng/primeng';

// Internal-Components
import { ContentComponent, FilterComponent, FooterComponent, GridComponent, HeaderComponent, SidebarComponent } from './modules/index';

// Services
import { CanectService } from './services/index';

import * as $ from 'jquery';

@NgModule({
    declarations: [ContentComponent, FilterComponent, FooterComponent, GridComponent, HeaderComponent, SidebarComponent],
    imports: [
        FormsModule,
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        LayoutModule, DropDownsModule, DropDownListModule, GridModule,
        MultiSelectModule, ButtonsModule
    ],
    providers: [CanectService],
    exports: [ContentComponent, FilterComponent, FooterComponent, GridComponent, HeaderComponent, SidebarComponent]
})

export class SharedModule { }