import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor';

//Permission
//import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//Geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

// Leaflet
import { NglCoreModule } from 'angular-leaflet';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, NglCoreModule, ReactiveFormsModule],
  providers: [
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
