import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(private httpClient:HttpClient){}

    public get(uri:string) : Observable<any> {
        return this.httpClient.get(environment.API_BASE_URL + uri);
    }

    public post(uri:string,payload:any) : Observable<any> {
        return this.httpClient.post(environment.API_BASE_URL + uri, payload);
    }

    public put(uri:string,payload:any) : Observable<any> {
        return this.httpClient.put(environment.API_BASE_URL + uri, payload);
    }

    public delete(uri:string,payload:any) : Observable<any> {
        return this.httpClient.delete(environment.API_BASE_URL + uri, payload);
    }
}