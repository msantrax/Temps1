import {Component, NgModule, OnInit} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";


@Component({
  selector: 'app-privacy-policies',
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss']
})
export class PrivacyPoliciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  exports: [PrivacyPoliciesComponent],
  declarations: [PrivacyPoliciesComponent],

  imports: [
    FlexLayoutModule
  ],

})
export class PrivacyPoliciesModule {}
