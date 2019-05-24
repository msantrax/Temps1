
import {Routes} from '@angular/router';
import {Homepage} from "./pages/homepage";



export const APP_ROUTES: Routes = [

  {path: '', component: Homepage, pathMatch: 'full', data: {}},

  {path: '**', redirectTo: ''},
];

