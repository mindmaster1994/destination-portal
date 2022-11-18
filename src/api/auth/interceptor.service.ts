import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, map, catchError, of, tap } from "rxjs";
import { NotifyService } from "src/app/components/notify/notify-service";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class InterceptorService implements HttpInterceptor {
    token: any;
    omitCalls = ['signin','create','listing','delete'];
    omitNotify = ['favouriteDestinations'];
    skipInterceptor = false;
    constructor(private router: Router, private authService:AuthService, private notifyService:NotifyService, private toasterService:ToastrService) { }

    omitNotifyFunc(req){
      for(var i=0; i < this.omitNotify.length; i++){
        var api = this.omitNotify[i];
        if(req.url.includes(api))
          return true;
      }

      return false;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.skipInterceptor = false;
      if(req.method == "GET"){
        this.notifyService.showNotify("Fetching Data");
      }
      else if(req.method == "POST" || req.method == "PUT") {
        if(this.router.url != "/login" && !this.omitNotifyFunc(req))
          this.notifyService.showNotify("Saving Data");
      }
      this.omitCalls.forEach(api => {
        if (req.url.includes(api)) {
          this.skipInterceptor = true;
        }
      });

      this.token = this.authService.getUserToken();

      if (this.token && !this.skipInterceptor) {
        const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
        return next.handle(tokenizedReq).pipe(
          catchError((err: any) => {
            
            if(err instanceof HttpErrorResponse) {
                try {

                  if(err.statusText && err.statusText == "Unknown Error"){
                    this.toasterService.error("Network error");
                  }

                  const error = err.error;
                  if(error && !error.success){
                    debugger;
                      
                      if(error.errors && error.errors[0]){
                        var e = error.errors[0];
                        this.toasterService.error(e.message);
                      }
                  }
                } catch(e) {
                    this.toasterService.error(e.message);
                }
            }
            this.notifyService.hideNotify();
            err.success = false;

            return of(err);
          }),
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if(req.method == "POST" || req.method == "PUT"){
                if(event.body && event.body.success){
                  if(!this.omitNotifyFunc(req))
                    this.toasterService.success(event.body.result);
                }
                else if(event.body && !event.body.success){
                  var error = event.body.errors[0];
                  this.toasterService.error(error.message);
                }
              }
              
              this.notifyService.hideNotify();
              if (event.status === 401) {
                this.authService.logout();
              }
            }
            return event;
        }));
      }

      return next.handle(req).pipe(
        tap(evt => {
          
            if (evt instanceof HttpResponse) {
              this.notifyService.hideNotify();
               if(evt.body && !evt.body.success){
                var error = evt.body.errors[0];
                this.toasterService.error(error.message);
               }

               if(evt.body && evt.body.success){
                this.toasterService.success(evt.body.result);
               }
                  
            }            
        }),
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                try {
                    const error = err.error;
                    if(error && !error.success){
                        var e = error.errors[0];
                        this.toasterService.error(e.message);
                    }
                } catch(e) {
                    console.log("Something went wrongss!!");
                }
            }
            this.notifyService.hideNotify();
            err.success = false;

            return of(err);
        }));
    }
}