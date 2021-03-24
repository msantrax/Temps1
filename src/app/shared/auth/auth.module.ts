import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders, InjectionToken, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FirebaseAppConfig, FirebaseOptionsToken, FirebaseNameOrConfigToken} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';

import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatMenuModule,
  MatGridListModule
} from '@angular/material';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {AuthComponent} from './firebaseui/auth.component';
import {UserComponent} from './user/user.component';
import {AuthProvidersComponent} from './providers/auth.providers.component';
import {EmailConfirmationComponent} from './email-confirmation/email-confirmation.component';
import {defaultAuthFirebaseUIConfig, NgxAuthFirebaseUIConfig} from './interfaces/config.interface';
import {FirestoreSyncService} from './firestore-sync.service';
import {AuthProcessService} from './auth-process.service';


import { AuthService } from './auth.service';
import {UserPicker} from "./user-picker";


import {NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {NgxAuthFirebaseuiAvatarComponent} from "./avatar/ngx-auth-firebaseui-avatar.component";
import {LegalityDialogComponent} from "./legal/legality-dialog.component";
import {LoggedInGuard} from './logged-in.guard';


// Export module's public API
// components
export {AuthComponent} from './firebaseui/auth.component';
export {UserComponent} from './user/user.component';
export {NgxAuthFirebaseuiAvatarComponent} from './avatar/ngx-auth-firebaseui-avatar.component';
export {AuthProvidersComponent, Theme, Layout} from './providers/auth.providers.component';
export {LegalityDialogComponent} from './legal/legality-dialog.component';
// services
export {AuthProcessService, AuthProvider} from './auth-process.service';
export {FirestoreSyncService} from './firestore-sync.service';
// guards
export {LoggedInGuard} from './logged-in.guard';
// interfaces
export {NgxAuthFirebaseUIConfig} from './interfaces/config.interface';

export const NgxAuthFirebaseUIConfigToken = new InjectionToken<NgxAuthFirebaseUIConfig>('NgxAuthFirebaseUIConfig');

@NgModule({
  imports: [
    CommonModule,

    // HTTP
    RouterModule,
    HttpClientModule,
    // FLEX_LAYOUT
    FlexLayoutModule,
    // FORMS
    FormsModule,
    ReactiveFormsModule,

// MATERIAL2
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatMenuModule,
    // ANGULAR MATERIAL EXTENSIONS
    //MatPasswordStrengthModule,
    // ANGULARFIRE2
    AngularFireAuthModule,
    AngularFirestoreModule,

    NgxAuthFirebaseUIModule,
    BrowserAnimationsModule
  ],
  
  declarations: [

    UserPicker,

    AuthComponent,
    UserComponent,
    NgxAuthFirebaseuiAvatarComponent,
    AuthProvidersComponent,
    EmailConfirmationComponent,
    LegalityDialogComponent

  ],

  exports: [
    UserPicker,

    AuthComponent,
    UserComponent,
    NgxAuthFirebaseuiAvatarComponent,
    AuthProvidersComponent,
    EmailConfirmationComponent,
    // LoggedInGuard,
    AngularFireAuthModule,
    AngularFirestoreModule

  ],

  entryComponents : [
    UserComponent,
    LegalityDialogComponent
  ],

  // providers: [AuthService],


})

//export class AuthModule { }


export class AuthModule {

  static forRoot(configFactory: FirebaseAppConfig,
                 appNameFactory?: () => string,
                 config: NgxAuthFirebaseUIConfig = defaultAuthFirebaseUIConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers:
        [
          {
            provide: FirebaseOptionsToken,
            useValue: configFactory
          },
          {
            provide: FirebaseNameOrConfigToken,
            useFactory: appNameFactory
          },
          {
            provide: NgxAuthFirebaseUIConfigToken,
            useValue: config
          },
          //AuthProcessService,
          AuthService,
          FirestoreSyncService,
          LoggedInGuard
        ],
    };
  }

  constructor(@Inject(NgxAuthFirebaseUIConfigToken)
              public config: NgxAuthFirebaseUIConfig) {
    this.config = Object.assign(defaultAuthFirebaseUIConfig, this.config);
  }
}
