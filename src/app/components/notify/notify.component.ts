import { Component, Input, OnInit } from '@angular/core';
import { NotifyService } from './notify-service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  
  constructor(public notifyService: NotifyService) { }

  ngOnInit() {
    
  }

}
