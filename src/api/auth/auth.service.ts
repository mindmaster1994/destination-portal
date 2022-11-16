import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { APIService } from "../api.service";

@Injectable()
export class AuthService {

    private otp: any = null;

    private currentUser:any = null;

    private userSubject = new Subject<any>();

    constructor(public jwtHelper: JwtHelperService, private apiService:APIService, private router:Router) {}
    
    public isAuthenticated(): boolean {
      const token:any = localStorage.getItem('token');

      return !(token == null || this.jwtHelper.isTokenExpired(token));
    }

    public login(payload:Object) : Observable<any> {
        return this.apiService.post("/users/signin",payload);
    }

    public getUserToken(){
        const token = localStorage.getItem("token");

        return token;
    }

    public logout(){
        this.currentUser = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.router.navigate(["/login"]);
    }

    public getCurrentUser():Observable<any>{
        return this.userSubject.asObservable();
    }

    public setCurrentUser(user:any){
        if(user == null){
            this.logout();
            return;
        }

        this.currentUser = user;

        localStorage.setItem("user",JSON.stringify(user));

        this.userSubject.next(user);
    }

    public isLoggedIn(){
        var user = localStorage.getItem("user");
        if(user == null){
            this.logout();
            return;
        }

        this.currentUser = JSON.parse(user);

        this.userSubject.next(this.currentUser);
    }

    public sendEmailAddress(data: any) : Observable<any> {
        return this.apiService.post("/users/reset-password/init",data);
    }

    setOtp(otp:any) {
        this.otp = otp;
    }

    getOtp(): any {
        return this.otp;
    }

    public sendResetRequest(data: any) : Observable<any> {
        return this.apiService.post("/users/reset-password/finish", data);
    }

}