import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import {HttpTest} from "./httptest";

const httpOptions = {
  headers: new HttpHeaders({
    "Accept": "*/*",
    "Authorization": "Basic b3B1czpvcHVz",
    "Content-Type": "application/json",
    "Cache-control" : "no-cache"
  })
};


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };



@Injectable({
  providedIn: 'root'
})
export class DatagateService {

  testUrl = 'http://localhost:8888/login';
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {

    this.handleError = httpErrorHandler.createHandleError('HeroesService');

  }

   /** GET de teste */
  getTest (){
    return this.http.get<HttpTest>(this.testUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getHeroes', ))
      );
  }




}
