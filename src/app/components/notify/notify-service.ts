import { Injectable } from '@angular/core';

@Injectable({
    providedIn:"root"
})
export class NotifyService {
    
    public shown = false;
    public message = "";

    constructor() { }
    
    showNotify(message:any)
    {
        this.message = message;
        this.shown = true;
    }

    hideNotify()
    {
        this.message = "";
        this.shown = false;
    }

}