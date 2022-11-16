import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { APIService } from "../api.service";
import { Constants } from "../constants/constants";

@Injectable()
export class UserService {

    users:any = [];
    conveyorUsers:any = [];
    selected:any = null;
    alertsCount = 0;

    constructor(private apiService:APIService, private router:Router){
    }

    public get() {
        return this.apiService.get("/users/listing?page=0&size=10&sortby=id&order=asc")
            .subscribe(response => {
                if(response.success) {
                    this.users = response.result;
                }
            });
    }

    public getById(id) {
        return this.apiService.get(`/users/${id}`);
    }

    public create(data:any) {
        return this.apiService.post("/users/signup",data)
            .subscribe(response => {
                console.log(response);
                if(response.success) {
                    
                    this.router.navigate(["/view-users"]);
                }
            });
    }

    public update(data:any) {
        return this.apiService.put("/users",data)
            .subscribe(response => {
                console.log(response);
                if(response.success) {
                    
                    this.router.navigate(["/view-users"]);
                }
            });
    }

    public getUsersByRole() {
        return this.apiService.get("/users?roleName=CONVENER")
            .subscribe(response => {
                console.log(response);
                if(response.success) {
                    this.conveyorUsers = response.result;
                }
            });
    }

    public getUserUnReadCount() {
        return this.apiService.get("/systemAlerts/unread-count")
            .subscribe(response => {
                if(response.success) {
                    this.alertsCount = response.result;
                }
            });
    }

}