import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/api/auth/auth.service';
import { NotifyService } from '../../notify/notify-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:any;
  password:any;

  constructor(private activeModal:NgbActiveModal, private authService:AuthService, private notifyService:NotifyService) { }

  ngOnInit(): void {
  }

  auth(){

    var data = {
      email:this.email,
      password:this.password
    };

    this.notifyService.showNotify("Signing In");

    this.authService.login(data)
      .subscribe(response => {
        this.notifyService.hideNotify();
        
       
        if(response.success){
          
          localStorage.setItem("token", response.result.token);
          var user  = response.result.user;
          this.authService.setCurrentUser(user);
          this.activeModal.close();
          
          this.authService.isLoggedIn();
        }
      })
  }

}
