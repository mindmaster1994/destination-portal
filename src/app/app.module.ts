import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InterceptorService } from 'src/api/auth/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DestinationService } from 'src/api/services/destination.service';
import { AuthService } from 'src/api/auth/auth.service';
import { APIService } from 'src/api/api.service';
import { NotifyService } from './components/notify/notify-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     },
     NotifyService,
     APIService,
     AuthService,
     DestinationService,
     
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
