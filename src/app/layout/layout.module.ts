import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DestinationComponent } from "../components/dialogs/destination/destination.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule
    ],
    exports:[
        HeaderComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations:[
        HeaderComponent,
        DestinationComponent
    ]
})
export class LayoutModule{}