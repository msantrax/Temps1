/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import * as Collections from 'typescript-collections';


export class WDescriptor{
    
    constructor(public factory_name:string, public wmodule:string, public routepoint: boolean) {
             
    }
   
}

export class AnfitriaWMap {
    
    
    public wdict = new Collections.Dictionary<string, WDescriptor>();
      
    constructor() {
        
        this.wdict.setValue('w_authdropdown',       new WDescriptor ('AuthdropdownComponent', 'Anfitria', false));
        this.wdict.setValue('w_login',              new WDescriptor ('CtrlloginComponent', 'Anfitria', true));
        this.wdict.setValue('w_register',           new WDescriptor ('CtrlregisterComponent', 'Anfitria', true));
        this.wdict.setValue('w_pagenotfound',       new WDescriptor ('PageNotFoundComponent', 'Anfitria', true));
        this.wdict.setValue('w_widgetnotfound',     new WDescriptor ('WidgetNotFoundComponent', 'Anfitria', true));
        this.wdict.setValue('w_header',             new WDescriptor ('CtrlheaderComponent', 'Anfitria', false));
        this.wdict.setValue('w_footer',             new WDescriptor ('CtrlfooterComponent', 'Anfitria', false));
        this.wdict.setValue('w_detail',             new WDescriptor ('CtrldetailComponent', 'Anfitria', true));
        this.wdict.setValue('w_land',               new WDescriptor ('CtrllandComponent', 'Anfitria', true));
        this.wdict.setValue('w_contact',            new WDescriptor ('CtrlcontactComponent', 'Anfitria', true));
        this.wdict.setValue('w_subject',            new WDescriptor ('SubjectComponent', 'Anfitria', false));
        this.wdict.setValue('w_infobar',            new WDescriptor ('InfobarComponent', 'Anfitria', false));
        this.wdict.setValue('w_megamenu',           new WDescriptor ('MegamenuComponent', 'Anfitria', false));
        this.wdict.setValue('w_seed1',              new WDescriptor ('Seed1Component', 'Anfitria', false));
        
        this.wdict.setValue('w_jfooter',            new WDescriptor ('JFooterComponent', 'Anfitria', false));
        this.wdict.setValue('w_jheader',            new WDescriptor ('JHeaderComponent', 'Anfitria', false));
        this.wdict.setValue('w_jland',              new WDescriptor ('JLandComponent', 'Anfitria', false));
    }
    
    
    
    addEntry( wkey : string, factory_name:string, wmodule:string, routepoint: boolean){
        
        this.wdict.setValue(wkey, new WDescriptor (factory_name, wmodule, routepoint));
    }
    
    
    
}

