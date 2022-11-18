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

    public markFavourite(id){
        return this.apiService.put(`/destinations/mark-favourite?id=${id}`,{});
    }

    public UnmarkFavourite(id){
        return this.apiService.put(`/destinations/unmark-favourite?id=${id}`,{});
    }

    public save(data:any,file) {

        var formData = new FormData();
        formData.append("payload", new Blob([JSON.stringify(data)],{
            type: "application/json"
        }));
        formData.append("file",file);

        if(data.id == undefined){
            return this.apiService.post("/destinations/create",formData);
        }
        else{
            return this.apiService.put("/destinations/update",formData);
        }
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