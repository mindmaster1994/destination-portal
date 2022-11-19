import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { APIService } from "../api.service";
import { WebsocketService } from "../services/websocket.service";

@Injectable()
export class AuthService {

    private otp: any = null;

    private currentUser:any = null;

    private userSubject = new Subject<any>();

    favourites = [];
    favouriteIds = [];

    constructor(public jwtHelper: JwtHelperService, private apiService:APIService, private router:Router, private websocketService:WebsocketService) {}
    
    public isAuthenticated(): boolean {
      const token:any = localStorage.getItem('token');

      return !(token == null || this.jwtHelper.isTokenExpired(token));
    }

    public login(payload:Object) : Observable<any> {
        return this.apiService.post("/users/signin",payload);
    }

    public getFavouriteDestinations() {
        return this.apiService.get("/users/favouriteDestinations")
            .subscribe(response => {
                console.log(response);
                if(response.success){
                    if(response.data == undefined){
                        this.favourites = [];
                        this.favouriteIds = [];
                        return;
                    }

                    this.favourites = response.data;
                    
                    if(this.favourites.length == 0){
                        this.favouriteIds = [];
                        return;
                    }

                    this.favouriteIds = this.favourites.map(item => item.id);

                    this.websocketService._send({favourites:this.favouriteIds});
                }
            });
    }

    public getUserToken(){
        const token = localStorage.getItem("token");

        return token;
    }

    public logout(){
        this.currentUser = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.userSubject.next(null);
        window.location.reload();
       
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
            return;
        }

        this.currentUser = JSON.parse(user);

        this.websocketService.getConnectionAsObservable()
            .subscribe(response => {
                this.getFavouriteDestinations();
            });

        this.websocketService._connect();

        this.userSubject.next(this.currentUser);
    }

   

}