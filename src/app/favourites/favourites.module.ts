import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { RouterModule } from "@angular/router";
import { DestinationCardModule } from "../components/ui/destination-card/destination-card.module";
import { FavouritesComponent } from "./favourites.component";


@NgModule({
    declarations: [
      FavouritesComponent
    ],
    exports: [
        FavouritesComponent
    ],
    imports: [
        CommonModule, 
        DestinationCardModule,
        RouterModule.forChild([
            {
                path: '',
                component: FavouritesComponent
            }
        ]),
    ],
    providers:[
      
    ]
  })
  export class FavouritesModule { }