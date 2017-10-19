import { Routes, RouterModule } from '@angular/router';
import { AppLoadComponent, MenuComponent }  from './app.component';
import { ConfirmationPageComponent } from './confirmation-page.component';
import { ErrorPageComponent } from './error-page.component';
	
const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'menu/takeSurvey/:formCode', component: AppLoadComponent },
    { path: 'menu/takeSurvey/:formCode/formVersion/:formVerCode', component: AppLoadComponent },
    { path: 'menu/viewSurvey/:formSubCode', component: AppLoadComponent, data:{mode:"readOnly"} },
    { path: 'menu/amendSurvey/:formSubCode', component: AppLoadComponent, data:{mode:"amend"} },
    { path: 'menu/editSurvey/:formSubCode', component: AppLoadComponent, data:{mode:"edit"} },
    { path: 'confirm/:subCode', component: ConfirmationPageComponent },
    { path: 'error/:errorCode', component: ErrorPageComponent },
    { path: '**', redirectTo: 'menu', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);
