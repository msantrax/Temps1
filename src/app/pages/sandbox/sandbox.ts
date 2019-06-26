import {Component, ChangeDetectionStrategy,NgModule, OnInit} from '@angular/core';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {MatButtonModule} from '@angular/material/button';
import {FooterModule} from '../../shared/footer/footer';
import {RouterModule} from '@angular/router';
import {ComponentPageTitle} from '../page-title/page-title';
import {AppState} from "../../shared/state/appstate.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule, MatSnackBarModule} from "@angular/material";
import {DatePipe, formatDate} from "@angular/common";
import {AngularFireFunctions} from "@angular/fire/functions";
import {first} from "rxjs/operators";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ScrollDispatchModule} from "@angular/cdk/scrolling";

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.html',
  styleUrls: ['./sandbox.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sandbox implements OnInit {

  sb_jserverout : string = "init state";
  sb_current_time : string;
  pipe = new DatePipe('en-US');


  constructor(public _componentPageTitle: ComponentPageTitle,
              public appstate : AppState,
              private spinner: NgxSpinnerService,
              private _snackBar: MatSnackBar,
              private fns: AngularFireFunctions,
              private http: HttpClient) {}


  ngOnInit(): void {
    this._componentPageTitle.title = '';
    this.sb_current_time = this.pipe.transform(Date.now(), 'medium');
  }

  jsonout = {
    id : "000345",
    name : "nome de teste",
    type : "tipo de teste"
  }




  test2(){

    this.sb_jserverout = "";

    var options = {
      //uri: 'http://104.197.197.79:8080/artifacts1.json',
      uri: 'http://localhost:8888/login',
      headers: {
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Authorization": "Basic b3B1czpvcHVz",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
      },
      json: true,
      encoding : 'utf-8',
      //agent : agent,
      //time : true
    };


    this.spinner.show();

    this.fns.httpsCallable('serverProxy')(options)
        .pipe(first())
        .subscribe(
          resp => {
            this.spinner.hide();
            this.sb_jserverout = resp;
          },
          err => {
            this._snackBar.open("Erro no acesso do servidor", err, {
              duration: 2000,
            });
            console.error({ err});
            this.spinner.hide();
          }
        );
  }

  test1(){

    this.sb_jserverout = "";

    this.spinner.show();

    this.fns.httpsCallable('serverProxyHttp')( this.jsonout)
        .pipe(first())
        .subscribe(
          resp => {
            this.spinner.hide();
            this.sb_jserverout = JSON.stringify(resp, null, 2);
            //console.log(resp [0].artifactname)
            console.log({ resp });
          },
          err => {
            this._snackBar.open("Erro no acesso do servidor", err, {
              duration: 2000,
            });
            console.error({ err});
            this.spinner.hide();
          }
        );

    this.sb_current_time = this.pipe.transform(Date.now(), 'medium');
    console.log(this.sb_jserverout);
  }


}


@NgModule({
  imports: [SvgViewerModule,
            MatButtonModule,
            MatCardModule,
            FooterModule,
            RouterModule,
            FlexLayoutModule,
            NgxSpinnerModule,

            MatSnackBarModule,
            ScrollDispatchModule,

            HttpClientModule


          ],
  exports: [Sandbox],
  declarations: [Sandbox],
})
export class SandboxModule {}
