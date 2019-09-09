import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {NGXLogger} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MAT_LABEL_GLOBAL_OPTIONS} from '@angular/material';


// service
import {AppService, HttpService, LocalStorageService, NavService, LogService, UUIDService, TreeFilterService} from './app.service';

import {AppRouterModule} from './router/router.module';
import {Pipes} from './pipes/pipes';
import {AppComponent} from './pages/app.component';
import {PagesComponents} from './pages/pages.component';
import {ElementComponents} from './elements/elements.component';
import {ChangLanWarningDialogComponent, RDPSolutionDialogComponent, FontDialogComponent} from './elements/nav/nav.component';
import {DialogService, ElementDialogAlertComponent} from './elements/dialog/dialog.service';
import {PluginModules} from './plugins/plugins';
import {TestPageComponent} from './test-page/test-page.component';
import {AssetTreeDialogComponent, ManualPasswordDialogComponent} from './elements/connect/connect.component';
import {SftpComponent} from './elements/sftp/sftp.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRouterModule,
    ...PluginModules
  ],
  declarations: [
    AppComponent,
    TestPageComponent,
    ...Pipes,
    ...ElementComponents,
    ...PagesComponents,
    SftpComponent,
 ],
  entryComponents: [
    AssetTreeDialogComponent,
    ManualPasswordDialogComponent,
    ElementDialogAlertComponent,
    ChangLanWarningDialogComponent,
    RDPSolutionDialogComponent,
    FontDialogComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    // {provide: LoggerConfig, useValue: {level: LoggerLevel.WARN}},
    // {provide: BrowserXhr, useClass: NgProgressBrowserXhr},
    AppService,
    HttpService,
    LogService,
    NavService,
    UUIDService,
    LocalStorageService,
    DialogService,
    CookieService,
    TreeFilterService,
    NGXLogger,
    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ]
})
export class AppModule {
}
