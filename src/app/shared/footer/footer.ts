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

  mission = "O servidor SorptionLab é uma iniciativa da ACP Instruments Ltda.\
  visando proporcionar a pesquisadores e profissionais da área de instrumentação \
  analítica um ambiente de trabalho e ferramentas de cálculo que possibilitem o desenvolvimento \
  de melhores técnicas de análise de dados obtidos por ensaios de testes por adsorção de gases. \
  Participe também !"

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
