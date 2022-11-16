import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/api/constants/constants';
import { DestinationService } from 'src/api/services/destination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  page:any = {pageNumber:0,keyword:"",sortBy:Constants.DEFAULT_PAGE_SORT_BY, order:Constants.DEFAULT_PAGE_ORDER};
  
  destinations = [];
  subscription:Subscription;

  constructor(private destinationService:DestinationService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDestinations();

    this.subscription = this.destinationService.getDestinationObservable()
      .subscribe(res=>{
        this.getDestinations();
      });
  }

  getDestinations(pageInfo:any = {offset:0}) {
    this.page.pageNumber = pageInfo.offset;
    this.destinationService.getListings(this.page.keyword,this.page.pageNumber, this.page.pageSize, this.page.sortBy, this.page.order).subscribe(response => {
      console.log(response);
      if(response.success) {
        var result = response.data;
        this.destinations = result.content;
        this.page.pageNumber = result.number + 1;
        this.page.totalElements = result.totalElements;
        this.page.size = result.size;
      }
    });
  }

  onNextPage(e)
  {
    this.getDestinations({offset:e - 1});
  }

  onDelete(){
    this.getDestinations();
  }
}
