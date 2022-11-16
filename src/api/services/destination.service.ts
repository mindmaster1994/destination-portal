import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { APIService } from "../api.service";
import { Constants } from "../constants/constants";

@Injectable()
export class DestinationService {

    OnDestinationCreationSubject = new Subject();

    destinations:any = [];
    selected:any = null;

    constructor(private apiService:APIService, private router:Router){
    }

    public get() {
        return this.apiService.get("/users/listing?page=0&size=10&sortby=id&order=asc")
            .subscribe(response => {
                if(response.success) {
                    this.destinations = response.result;
                }
            });
    }

    public getById(id) {
        return this.apiService.get(`/users/${id}`);
    }

    public save(data:any) {
        if(data.id == undefined){
            return this.apiService.post("/destinations/create",data);
        }
        else{
            return this.apiService.put("/destinations/update",data);
        }
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

    public delete(id){
        return this.apiService.delete(`/destinations/delete?id=${id}`,{});
    }

    public getListings(keyword="",
        page:number=Constants.DEFAULT_PAGE_NUMBER,
        size:number=Constants.DEFAULT_PAGE_SIZE,
        sortby:any=Constants.DEFAULT_PAGE_SORT_BY,
        order:any=Constants.DEFAULT_PAGE_ORDER) {
        
        return this.apiService.get(`/destinations/listing?q=${keyword}&page=${page}&size=${size}&sortby=${sortby}&order=${order}`);
    }

    getDestinationObservable(){
        return this.OnDestinationCreationSubject.asObservable();
      }
}