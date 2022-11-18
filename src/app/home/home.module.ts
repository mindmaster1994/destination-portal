import { CommonModule } from "@angular/common";
import { NgModule} from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { LoginComponent } from "../components/dialogs/login/login.component";
import { DestinationCardModule } from "../components/ui/destination-card/destination-card.module";
import { HomeComponent } from "./home.component";


@NgModule({
    declarations: [
      HomeComponent,
    ],
    exports: [
        HomeComponent,
    ],
    imports: [
        CommonModule, 
        DestinationCardModule,
        NgxPaginationModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent
            }
        ]) 
    ],
    providers:[
      
    ]
  })
  export class HomeModule { }