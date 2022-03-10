import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WebLayoutComponent } from './layouts/web/web-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './layouts/web/title/title.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
 import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    AppComponent,
    WebLayoutComponent,
    AuthLayoutComponent,
    TitleComponent,
  ],
  // entryComponents: [ConfirmComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SharedModule,
    MomentModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    // { provide : LocationStrategy , useClass: HashLocationStrategy },
 //   ConfirmService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
