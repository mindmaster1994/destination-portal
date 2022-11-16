import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { APIService } from "../api.service";

@Injectable()
export class SharedService {

    
    constructor(){

    }

    private headerShown = true;
  
    showHeader(){
        this.headerShown = true;
    }

    isHeader(){
        return this.headerShown == true;
    }

    hideHeader(){
        this.headerShown = false;
    }

    getFormattedDateTime(date){
        if(!date) return "-";

        date = new Date(date);

        var month = date.getMonth() + 1;
        if(month < 10)
            month = "0" + month;
        
        var hours = date.getHours();
        if(hours < 10)
            hours = "0" + hours;

        var minutes = date.getMinutes();
        if(minutes < 10)
            minutes = "0" + minutes;

        return date.getDate() + "/" + month + "/" + date.getFullYear() + " " +
            hours + ":" + minutes;
    }

    getFormattedDate(date){
      if(!date) return "-";

      date = new Date(date);

      var month = date.getMonth() + 1;
      if(month < 10)
          month = "0" + month;
      
    

      return date.getDate() + "/" + month + "/" + date.getFullYear();
  }

  getFormattedDateSQL(date){
    if(!date) return "-";

    date = new Date(date);

    var month = date.getMonth() + 1;
    if(month < 10)
        month = "0" + month;
    
    return date.getFullYear() + "-" + month + "-" + date.getDate();
}

    array = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    getFormattedDateMonthEn(date){
      if(date == null)
        return "-";
        
      date = new Date(date);
    
      if(!date) return "-";

      let month = date.getMonth();
     
      let monthEn = this.array[month];

      return date.getDate() + " " + monthEn + " " + date.getFullYear();
  }

  
}

