import {Component, NgModule, ViewEncapsulation} from '@angular/core';
import {materialVersion} from '../version/version';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  // encapsulation: ViewEncapsulation.None

})
export class Footer {
  isNextVersion = location.hostname.startsWith('next.material.angular.io');

  version = materialVersion;


}


@NgModule({
  exports: [Footer],
  declarations: [Footer],

  imports: [
    FlexLayoutModule,
    RouterModule

  ],

})
export class FooterModule {}
