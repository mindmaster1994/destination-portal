import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AuthService } from 'src/api/auth/auth.service';
import { DestinationComponent } from 'src/app/components/dialogs/destination/destination.component';

import { LoginComponent } from 'src/app/components/dialogs/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser:any = null;

  constructor(private modalService:NgbModal, public authService:AuthService) {
    

    this.authService.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
      });

      this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    
  }

  openLoginDialog(){
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then((result:any) => {
    });
  }

  openDestinationDialog(){
    const modalRef = this.modalService.open(DestinationComponent);
    modalRef.result.then((result:any) => {
      
    });
  }


}
