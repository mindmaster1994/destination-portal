import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/api/auth/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }
}
