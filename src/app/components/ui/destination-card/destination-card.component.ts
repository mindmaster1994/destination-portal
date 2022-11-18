import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/api/auth/auth.service';
import { Constants } from 'src/api/constants/constants';
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

  uploadPath = Constants.UPLOAD_PATH;

  constructor(private modalService:NgbModal, private destinationService:DestinationService, public authService:AuthService) { }

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
        var index = this.authService.favouriteIds.indexOf(id);
        this.authService.favouriteIds.splice(index, 1);
        this.authService.favourites.splice(index, 1);
        
        this.OnDelete.emit(id);
      });    
  }

  markFavourite(){
    var id = this.item.id;
    this.destinationService.markFavourite(id)
      .subscribe(response => {
        console.log(response);
        if(response.success){
          this.authService.getFavouriteDestinations();
        }
      })
  }

  UnmarkFavourite(){
    var id = this.item.id;
    this.destinationService.UnmarkFavourite(id)
      .subscribe(response => {
        console.log(response);
        if(response.success){
          this.authService.getFavouriteDestinations();
        }
      })
  }
}
