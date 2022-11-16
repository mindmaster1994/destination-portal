import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DestinationService } from 'src/api/services/destination.service';
import { DestinationComponent } from '../../dialogs/destination/destination.component';

@Component({
  selector: 'app-destination-card',
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.css']
})
export class DestinationCardComponent implements OnInit {

  @Input()
  item:any;

  @Output()
  OnDelete = new EventEmitter();

  constructor(private modalService:NgbModal, private destinationService:DestinationService) { }

  ngOnInit(): void {
  }

  edit(item) {
    const modalRef = this.modalService.open(DestinationComponent);
    modalRef.componentInstance.payload = this.item;
    
    modalRef.result.then((result:any) => {
    });
  }

  deleteDestination(id){
    this.destinationService.delete(id)
      .subscribe(response => {
        this.OnDelete.emit();
      });    
  }

}
