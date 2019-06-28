import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }    from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AuthService } from './auth.service';
import {DatagateService} from "./datagate.service";
import { RequestCache, RequestCacheWithMap } from './request-cache.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { HttpErrorHandler }     from './http-error-handler.service';
import { MessageService }       from './message.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,

    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    })

  ],
  
  declarations: [


  ],
  exports: [

  ],

  providers: [AuthService, DatagateService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders ],


})
export class ServerGateModule { }
