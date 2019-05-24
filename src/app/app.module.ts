
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';


import {MatNativeDateModule} from '@angular/material/core';

import {APP_ROUTES} from './routes';
import {AppComponent} from './app.component';

import {HomepageModule} from './pages/homepage';
import {FooterModule} from './shared/footer/footer';
import {NavBarModule} from './shared/navbar';
import {ThemePickerModule} from './shared/theme-picker';
import {StyleManager} from './shared/style-manager';
import {ComponentPageTitle} from './pages/page-title/page-title';

import {SvgViewerModule} from './shared/svg-viewer/svg-viewer';

import {DocumentationItems} from './shared/documentation-items/documentation-items';
import {GaService} from './shared/ga/ga';


@NgModule({

  declarations: [
    AppComponent,


  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),

    HomepageModule,
    NavBarModule,
    FooterModule,
    SvgViewerModule,
    ThemePickerModule,

  ],

  providers: [
    ComponentPageTitle,
    DocumentationItems,
    StyleManager,
    GaService,
  ],

  bootstrap: [AppComponent],

})

export class AppModule {

}
