import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';

import {UserPicker} from "./user-picker";
import {MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule, MatTooltipModule} from "@angular/material";

//import { CtrlloginComponent } from './ctrllogin.component';
//import { CtrlregisterComponent }  from './ctrlregister.component';


@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,


  ],
  
  declarations: [
      UserPicker,
      //CtrlloginComponent,
      //CtrlregisterComponent

  ],
  exports: [
      //CtrlloginComponent,
      //CtrlregisterComponent,
       UserPicker

  ],
  providers: [AuthService],


})
export class AuthModule { }
