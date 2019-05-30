import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  OnInit,
  OnDestroy,
} from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import {AuthService} from "./auth.service";


@Component({
  selector: 'user-picker',
  templateUrl: 'user-picker.html',
  styleUrls: ['user-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'aria-hidden': 'true'},
})



export class UserPicker implements OnInit, OnDestroy {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private afAuth : AuthService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }


  getAvatar(){

    return this.afAuth.avatar;

  }

}
