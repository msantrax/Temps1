// Component Factory stuff
import {
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ModuleWithComponentFactories,
  NgModule,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

import * as Collections from 'typescript-collections';
import {key} from 'firebase-key';
import {Md5} from './md5';

import {Observable, of, timer} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ReplaySubject} from 'rxjs';


import { AngularFireFunctions } from '@angular/fire/functions';

//import {AngularFireDatabase} from '@angular/fire/database';

import navbar_config from './navbar_config.json';
import app_script from './artifacts.json';


import {WidgetNotFoundComponent} from './widgetnotfound.component';
import {AnfitriaWMap, WDescriptor} from './anfitria.wmap';





export interface Options {
    items: number;
    dots: boolean;
    nav: boolean;
    autoplay: boolean;
    loop: boolean;
    autoplayTimeout: number;
    animateIn: string;
    animateOut: string;
}

export interface Artifact {
    uid: string;
    artifactname: string;
    options: Options;
    header: string;
    slimages: string[];
    sltext: string[][];
}

export const USEWMAP = true;
export const USEWNAME = false;


// export class Artifact{
//
//    constructor (   public key : string,
//                    public artifactname : string,
//                    public artifacttype : string,
//                    public component : string,
//                    public landpoint : string,
//                    public payload : any
//
//                    ){ }
// }

export class ArtifactDescriptor {

    constructor(  public parent: string,
                  public componentRef: ComponentRef<any>


                ) {
    }
}


@Injectable()
export class AppState {

    // Events support
    ticks = 0;
    private timer;
    private sub: Subscription;
    current_position = 0;
    current_page = -1;
    app_events = new Collections.LinkedList<string>();

    private site_model = 'Default';
    private site_id = '-LXey7jGNNzGU3Sskk9a';
    public editable = false;

    public site_header: string;
    public site_header$: Observable<string>;
    private site_header_sbj = new ReplaySubject<string>();
    public header_config: any;

    public site_footer: string;
    public site_footer$: Observable<string>;
    private site_footer_sbj = new ReplaySubject<string>();
    public footer_config: any;

    public site_land: string;
    public land_config: any;


    // Estruturas temporarias de teste do serviço de dados
//    land_artifacts : any;
//    navbar_artifacts : any;
//    app_artifacts : any;


    private afwmap = new AnfitriaWMap();
    artifact_descriptors = new Collections.Dictionary<string, ArtifactDescriptor>();

    // Artifacts recover
    items: Observable<any[]>;

    dict = new Collections.Dictionary<string, Artifact>();

    test_counter = 0;

    constructor(
                    private route: ActivatedRoute,
                    private router: Router,
                    public compiler: Compiler,
                    private resolver: ComponentFactoryResolver,
                    private http: HttpClient,
                    private fns: AngularFireFunctions

    ) {

        // Events services
        this.timer = timer(2000, 5000);
        this.sub = this.timer.subscribe(t => this.tickerFunc(t));


        this.fns.functions.useFunctionsEmulator( "http://localhost:5000");

        // this.site_header = "w_header";
        this.site_header$ = this.site_header_sbj.asObservable();

        // Load (if there is some) URL site config parameters
        this.site_model = this.getUrlParam('modelo', 'Default');
        this.editable = this.getUrlParam('editor', '4556').match('1992') ? true : false;

        this.loadfromURL();
        //this.loadfromFirebase();

        console.log(' App Service started...');

    }

    // private loadfromFirebase() {
    //
    //     this.items = this.db.list('/').snapshotChanges().pipe(
    //         map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    //     );
    //     this.items.subscribe(x => this.configFromFirebase(x));
    // }


    private loadfromURL() {

        //const cf = this.http.get('/jserver/artifacts1.json');
        //const cf = this.http.get('../assets/artifacts1.json');

        // cf.subscribe(resp => {
        //     this.configFromFirebase(this.normalizetoArray({ ... resp}));
        // });

    }



    public test1 () : string{

      let resp1 = "teste ";

      //const callable = this.fns.httpsCallable('date');


      this.fns.httpsCallable('helloWorld')({ text: 'Some Request Data' })
        .pipe(first())
        .subscribe(
          resp => {
            resp1 = resp;
            console.log({ resp });
          },
          err => {
            console.error({ err});
          }
        );

      return resp1 + this.test_counter++ ;


    }





    private normalizetoArray(obj): any[] {

        const ids = [];

        for (const prop in obj) {
          if (typeof obj[prop] == 'object' && obj[prop]) {
                const b = obj[prop];
                ids.push ({ key: prop,
                            'artifacname': b.artifactname,
                            'artifacttype': b.artifacttype,
                            component : b.component,
                            landpoint : b.landpoint,
                            payload : b.payload,
                            lookuptable : b.lookuptable
                          });
          }
        }

        return ids;
    }

    private configFromFirebase ( siteslk: any) {

       // this.site_header_sbj.next("w_jheader");

       const slk = siteslk.filter(function(item) {return item.key === '-LWG_000000000000001'; })[0].lookuptable[this.site_model];

       const site_descriptor = siteslk.filter(function(item) {return item.key === slk; });

       if (site_descriptor != undefined) {
            // Good, there is a good config
            const header = siteslk.filter(function(item) {return item.key === site_descriptor[0].payload.header; });
            const footer = siteslk.filter(function(item) {return item.key === site_descriptor[0].payload.footer; });
            const land = siteslk.filter(function(item) {return item.key === site_descriptor[0].payload.land; });


            const sheader = JSON.stringify(header);
            const md5header = Md5.hashStr(sheader);



            // Locate the header component
            if (header != undefined) {
                // Fine, we found a header artifact to this config
                this.site_header_sbj.next(header[0].component);
                this.header_config = header[0].payload || {};
            } else {
                // Ooops ! - No artifact found assign to default
                console.error('Header config not found, using default');
                this.site_header = 'w_header';
                this.header_config = navbar_config;
            }

            // Locate the footer
            if (footer != undefined) {
                this.site_footer = footer[0].component;
                this.footer_config = footer[0].payload;
            } else {
                console.error('Footer config not found, using default');
                this.site_footer = 'w_ctrlfooter';
                this.footer_config = {};
            }

            // And the Land component...
            if (land != undefined) {
                this.site_land = land[0].component;
                this.land_config = land[0].payload;
                this.addRoute (land[0].landpoint , land[0].component, true);
            } else {
                console.error('Land config not found, using default');
                this.site_land = 'w_ctrlland';
                this.land_config = {};
                this.addRoute ('ctrlland' , 'w_ctrlland', true);
            }

        }

       // this.site_header_sbj.next("w_header");

    }


    private configFromLocal(model: string) {

//
//        // Load the sites index table (is the first record @ sites variable
//        let site_lookup = app_script.sites[ "-LWG_000000000000001"];
//        // Now we know what to load...
//        this.site_id = site_lookup.lookuptable[model];
//
//        // Load initial status
//        let site_descriptor = app_script.sites[this.site_id];
//
//        if (site_descriptor != undefined){
//            // Good, there is a good config
//            let header = app_script.artifacts[site_descriptor.payload.header];
//            let footer = app_script.artifacts[site_descriptor.payload.footer];
//            let land = app_script.pages[site_descriptor.payload.land];
//
//            // Locate the header component
//            if (header != undefined){
//                // Fine, we found a header artifact to this config
//                this.site_header = header.component;
//                this.header_config = header.payload;
//            }
//            else{
//                // Ooops ! - No artifact found assign to default
//                console.error('Header config not found, using default');
//                this.site_header = "w_header";
//                this.header_config = navbar_config;
//            }
//            // Locate the footer
//            if (footer != undefined){
//                this.site_footer = footer.component;
//                this.footer_config = footer.payload;
//            }
//            else{
//                console.error('Footer config not found, using default');
//                this.site_footer = "w_ctrlfooter";
//                this.footer_config = {};
//            }
//            // And the Land component...
//            if (land != undefined){
//                this.site_land = land.component;
//                this.land_config = land.payload;
//                this.addRoute (land.landpoint , land.component, true);
//            }
//            else{
//                console.error('Land config not found, using default');
//                this.site_land = "w_ctrlland";
//                this.land_config = {};
//                this.addRoute ("ctrlland" , "w_ctrlland", true);
//            }
//
//        }

    }


    public getUID(): string { return key(); }

    private generateKeys() {for (let num = 0; num <= 20; num++) {console.log(key()); }}


    // Dynamic Component Services
    public createComponent(parent: string, compname: string, container: ViewContainerRef, config: any ): void {

        const compo: any = this.findComponent(compname, USEWMAP);
        const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(compo);
        const comporef: ComponentRef<any> = container.createComponent(factory);
        // this.artifact_descriptors.setValue( key(), new ArtifactDescriptor (parent, comporef))
        this.registerArtifact (parent, comporef);

        if (config != null) {
            comporef.instance.data = config;
        }

    }


    public installArtifacts ( artifacts: any, containers: Collections.Dictionary<string, ViewContainerRef>,
                                component: Component, uid: string) {

        let container;

        artifacts.forEach(function(value) {
            const artifact = this.getArtifact (Object.keys(value));

            // Find the container to drop to
            const container_ptr: string = <string>Object.values(value)[0];
            if (container_ptr == undefined || container_ptr == null) {
                // Nothig defined - use default (which is the first key)
                container = containers.getValue(containers.keys()[0]);
            } else {
                // There is place to go, address it
                container = containers.getValue(container_ptr);
            }


            if (artifact.artifacttype == 'widget') {
                this.createComponent(uid, artifact.artifactname, container, artifact.payload);
            } else {
                if (artifact.payload.templateCode != undefined) {
                    this.compileTemplate(uid, artifact.payload.templateCode, container);
                } else if (artifact.payload.templateUrl != undefined) {
                    const tmpl1 = this.getTemplatefromAssets('assets/templates/template1.html');
                    this.compileTemplate(uid, tmpl1, container);
                }

            }

        }.bind(this));

        // console.log( "artifact  loaded...")

    }


    // Template services  ============================================================================

    public getTemplatefromAssets(template: string): string {

        const tmpl = '<p>Template</p>';

        this.http.get('assets/templates/template1.html')
            .subscribe(data => {
                // tmpl = data.text()
                // console.log (tmpl)
            });

        return tmpl;
    }

    public compileTemplate(parent: string, template: string, container: ViewContainerRef ) {

        const metadata = {
           selector: `runtime-component-sample`,
           template: template
        };

        const factory = this.createComponentFactorySync(this.compiler, metadata, null);
        const comporef: ComponentRef<any> = container.createComponent(factory);
        comporef.instance.appState = this;
        // this.artifact_descriptors.setValue( key(), new ArtifactDescriptor (parent, comporef));
        this.registerArtifact (parent, comporef);

    }

    private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {

        let cmpClass: any;

        // =============
        class Icomponent {

            @ViewChild('widgetContainer1', { read: ViewContainerRef }) container1;
            @ViewChild('widgetContainer2', { read: ViewContainerRef }) container2;


            data = 'Teststring-out';
            appState: AppState;
            uid: string;

            constructor() {
                this.uid = key();
            }

            ngOnInit() {

                this.appState.createComponent(this.uid, 'w_seed1', this.container1, 'set by template on container 1');
                this.appState.createComponent(this.uid, 'w_seed1', this.container2, 'set by template on container 2');
            }

        }

        if (componentClass == undefined || componentClass == null) {
            cmpClass = Icomponent;
        } else {
            cmpClass = componentClass;
        }


        const decoratedCmp = Component(metadata)(cmpClass);

        @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
        class RuntimeComponentModule { }

        const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);

        return module.componentFactories.find(f => f.componentType === decoratedCmp);
    }


    // Artifacts Management =====================================================================================
    public listArtifacts() {

        Object.keys(app_script.artifacts).forEach(function(key) {
            const atype = app_script.artifacts[key].artifactname;
            console.log(key + '=' + atype);
        });
    }


    public getArtifact (id: string) {

        const artifact = app_script.artifacts[id];

        if (artifact != undefined) {
            return artifact;
        } else {
            console.error('Artifact config not found, using default');
            return app_script.artifacts['-LWG_000000000000000'];
        }

    }


    findComponent(compname: string, usemap: boolean): Function {

        if (usemap) {
            const wdesc: WDescriptor = this.afwmap.wdict.getValue(compname);
            compname = wdesc.factory_name;
        }

        const factories = Array.from(this.resolver['_factories'].keys());
        const factoryClass = <Type<any>>factories.find((x: any) => x.name === compname);
        if (factoryClass == undefined) {
            console.log('Widget not found : ' + compname);
            return WidgetNotFoundComponent;
        }

        return factoryClass;
    }



    public registerArtifact (parent: string, comporef: ComponentRef<any>) {

        this.artifact_descriptors.setValue( comporef.instance.uid, new ArtifactDescriptor (parent, comporef));
        console.log('Artifact ' + comporef.instance.uid + ' @ ' + parent + ' / type=' + comporef.componentType.name +  ' was registered');

    }

    public getArtifactChildren ( uid: string) {

        console.log('Searching childrens for : ' + uid);

        this.artifact_descriptors.values().forEach(function(descriptor) {

            const parent = descriptor.parent;
            if (parent == uid) {
                console.log('Parent' + parent + ' has child = ' + descriptor.componentRef.instance.uid);
            }
        });

    }


    // URL Parameter lookup services ===========================================================================
    private getUrlVars() {
        const vars = {};
        const whref = window.location.href;
        const re = /[?&]+([^=&]+)=([^&]*)/gi;
        const parts = whref.replace(re, function(m, key, value) {
            vars[key] = value;
            return value;
        });
        return vars;
    }

    private getUrlParam(parameter, defaultvalue): string {
        let urlparameter = defaultvalue;
        if (window.location.href.indexOf(parameter) > -1) {
            urlparameter = this.getUrlVars()[parameter];
        }
        return urlparameter;
    }


    // Route services ==========================================================
    addRoute (route: string , compname: string, usemap: boolean) {

        const compo = this.findComponent(compname, usemap);

        this.router.config.unshift(
            {path: route, component: <any>compo}
        );

    }


    public flagServiceCalled() {

        console.log('Service called ...');
    }



    tickerFunc(tick) {
        // console.log(this);
        this.ticks = tick;
        // console.log("Status @ " + new Date().getTime() + " scroll= " + this.current_position + " @ " + this.current_page);
        if (this.app_events.size() > 0) {
            this.app_events.forEach(function(value) {
                console.log('State Event = ' + value);
            });
            this.app_events.clear();
        }
    }


    updatePosition ( page: number, position: number) {
        // console.log("Scroll Event=", position );
        if (this.current_page !== page) {
            this.app_events.add(new Date().getTime() + ':' + 'pageload:' + page);
            this.current_page = page;
        }

        if ((position > this.current_position + 200) || position < this.current_position - 200) {
            this.app_events.add(new Date().getTime() + ':' + 'pagescroll:' + position);
            this.current_position = position;
        }


    }

}

@NgModule({
  imports: [
    CommonModule,

  ],

  declarations: [
    WidgetNotFoundComponent,

  ],
  exports: [
    WidgetNotFoundComponent

  ],
  providers: [AppState],


})
export class AppStateModule { }



/**
-LWG_ppZDHg8mln4OgZh
-LWG_rWTHPbWm--PKUtr
-LXey7j5jZOck3WWJcUG
-LXey7jECquW1SV6YVEQ
-LXey7jFThUwGEPUoxBF
-LXey7jGNNzGU3Sskk9a
-LXey7jHb400Cx3NwKmZ
-LXey7jIiStuUaC2aUAk
-LXey7jJluUJQlAtjyTa
-LXey7jKZLDdMnM-VTQv
-LXey7jLhz9f9OOIXzrl
-LXey7jMWccau0MlFbI-
-LXey7jNvVt_PcE5EtyH
-LXey7jOt1xxkSfFoQPk
-LYDiC1ofGFNoatQdonP
-LYDiC1wNfAaSt2YJuhQ
-LYDiC1xDR5rwI_n0yW2
-LYDiC1yJ4GxDueEPqfU
-LYDiC1ztflqE41xUejY
-LYDiC2-IRk5vjYFVzjG
-LYDiC20H2u7CleNbXQC
-LYDiC210Ph8Le_qXY3e
-LYDiC22Mokw9z6G-vGQ
-LYDiC23P3C5jJ1vfUjL
-LYDiC24IDLTZarDgTim
-LYDiC25p4DfmL2Z6-jl
-LYDiC26r_Ap3D3mTu1H
-LYDiC273I4sGnBNdT_n
-LYDiC2873pRuQ8CsJ6x
-LYDiC297gDPAhksKf5l
-LYDiC2A8XF8pb0maIcA
-LYDiC2BvW52ImqBNOhp
-LYDiC2CQmXLh_lAuuNO
-LYDiC2Dm85BJ4hXkjoY
//-LYDiC2ESxdEBTlO0-Pt

 */






//        var temp = db.list('/artifacts', ref => ref);

        // var adaRef = firebase.database().ref("artifacts");

//        var temp = db.database().ref('/artifacts/').once('value').then(function(snapshot) {
//            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//        });
//



// import { v4 as uuid } from 'uuid';
// import { key } from "firebase-key";
//
//


//
//      // Recover from firebase
//        this.itemsRef = db.list('artifacts' , ref => ref.orderByChild('uid').equalTo('4567890'));
//
//        this.items = this.itemsRef.snapshotChanges().pipe(
//            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
//        );
//
//        this.items.subscribe(x => console.log(x));
//
//
////        console.log('Items : ' + this.items);
//
////        listref.valueChanges().subscribe(actions => {
////            actions.forEach(action => {
////
////                //console.log(<Artifact>action.header);
////                this.dict.setValue(action.header, <Artifact>action);
////
////                console.log('artifact was loaded : ' + action.uid);
////
////            });
////        });
//
//


        // Recover from firebase
        // this.itemsRef = db.list('artifacts' , ref => ref.orderByChild('uid').equalTo('4567890'));


//        let site_script2 = app_script.pipe(
//            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
//        );

//        this.items = this.itemsRef.valueChanges();


        // this.configFromLocal(this.site_model);
