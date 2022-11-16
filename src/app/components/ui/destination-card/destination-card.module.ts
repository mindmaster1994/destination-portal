import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { DestinationCardComponent } from "./destination-card.component";


@NgModule({
    declarations: [
      DestinationCardComponent
    ],
    exports: [
        DestinationCardComponent
    ],
    imports: [
        CommonModule, 
    ],
    providers:[
      
    ]
  })
  export class DestinationCardModule { }