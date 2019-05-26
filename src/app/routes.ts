
import {Routes} from '@angular/router';
import {Homepage} from "./pages/homepage";
import {UsageContractComponent} from "./pages/usage-contract";
import {PrivacyPoliciesComponent} from "./pages/privacy-policies";



export const APP_ROUTES: Routes = [

  {path: '', component: Homepage, pathMatch: 'full', data: {}},

  {
    path: 'usage',
    component: UsageContractComponent
  },

  {
    path: 'privacy',
    component: PrivacyPoliciesComponent
  },



  {path: '**', redirectTo: ''},
];

