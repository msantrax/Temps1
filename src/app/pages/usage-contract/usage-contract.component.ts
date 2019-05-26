import {Component, NgModule, OnInit} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";


@Component({
  selector: 'app-usage-contract',
  templateUrl: './usage-contract.component.html',
  styleUrls: ['./usage-contract.component.scss']
})
export class UsageContractComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


@NgModule({
  exports: [UsageContractComponent],
  declarations: [UsageContractComponent],

  imports: [
    FlexLayoutModule
  ],

})
export class UsageContractModule {}
