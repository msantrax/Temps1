import {Component, NgModule, OnInit} from '@angular/core';
import {SvgViewerModule} from '../../shared/svg-viewer/svg-viewer';
import {MatButtonModule} from '@angular/material/button';
import {FooterModule} from '../../shared/footer/footer';
import {RouterModule} from '@angular/router';
import {ComponentPageTitle} from '../page-title/page-title';




@Component({
  selector: 'sandbox',
  templateUrl: './sandbox.html',
  styleUrls: ['./sandbox.scss']
})
export class Sandbox implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) {}

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }


  test1(){
    console.log("Test1 clicked");
  }
}

@NgModule({
  imports: [SvgViewerModule, MatButtonModule, FooterModule, RouterModule],
  exports: [Sandbox],
  declarations: [Sandbox],
})
export class SandboxModule {}
