
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {MatNativeDateModule} from '@angular/material/core';

import {APP_ROUTES} from './routes';
import {MatApp} from './mat-app';

import {HomepageModule} from './pages/homepage';
import {FooterModule} from './shared/footer/footer';
import {NavBarModule} from './shared/navbar';
import {SandboxModule} from "./pages/sandbox";


import {ThemePickerModule} from './shared/theme-picker';
import {StyleManager} from './shared/style-manager';
import {ComponentPageTitle} from './pages/page-title/page-title';

import {SvgViewerModule} from './shared/svg-viewer/svg-viewer';
import {DocumentationItems} from './shared/documentation-items/documentation-items';
import {GaService} from './shared/ga/ga';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import {UsageContractModule} from "./pages/usage-contract/usage-contract.component";
import {PrivacyPoliciesModule} from "./pages/privacy-policies/privacy-policies.component";
import {AppState, AppStateModule} from "./shared/state/appstate.service";


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule} from '@angular/fire/functions';


import { environment } from '../environments/environment';



@NgModule({

  declarations: [
    MatApp,

  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxSpinnerModule,

    RouterModule.forRoot(APP_ROUTES),

    AngularFireModule.initializeApp(environment.firebase, 'sorptionlab'),
    AngularFireAuthModule,
    AngularFireFunctionsModule,

    HomepageModule,
    NavBarModule,
    FooterModule,
    SvgViewerModule,
    ThemePickerModule,
    UsageContractModule,
    PrivacyPoliciesModule,
    SandboxModule,
    AppStateModule


  ],

  providers: [
    ComponentPageTitle,
    DocumentationItems,
    StyleManager,
    GaService,
    AppState,
    // {provide: FUNCTIONS_ORIGIN, useValue: 'http://localhost:5001'}

  ],

  bootstrap: [MatApp],

})

export class AppModule {

}
