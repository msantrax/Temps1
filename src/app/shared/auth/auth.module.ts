import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';

import {UserPicker} from "./user-picker";
import {MatButtonModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,

} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,

    NgxAuthFirebaseUIModule,
    BrowserAnimationsModule
  ],
  
  declarations: [
      UserPicker,

  ],
  exports: [
       UserPicker

  ],
  providers: [AuthService],


})
export class AuthModule { }
