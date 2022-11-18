import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DestinationService } from 'src/api/services/destination.service';

export class DestinationPayload {
  title:any;
  locationName:any;
}

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input()
  payload:DestinationPayload = new DestinationPayload();

  logo = null;
  
  constructor(private activeModal:NgbActiveModal, private destinationService:DestinationService, private router:Router,private toasterService:ToastrService) { }

  ngOnInit(): void {
    
  }

  handleFile(event){
    var files = event.target.files;
    if(files.length > 0)
      this.logo = files[0];
  }

  save(){
    this.destinationService.save(this.payload, this.logo)
      .subscribe(response => {
        
        this.activeModal.close();
        
        if(this.router.url != "/home"){
          this.router.navigate(["/home"]);
        }
        else{
          this.destinationService.OnDestinationCreationSubject.next(undefined);
        }

      });
  }
}
