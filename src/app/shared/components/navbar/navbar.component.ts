import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private tokenService: TokenService) {
  }
  onToProfile() {
    let token = localStorage.getItem('token');
    if (token != null) {
      let uuid = this.tokenService.getUUIDFromToken(token);
      if (uuid != null) {
        this.router.navigate(['/tickets-and-sessions/view/' + uuid]);
      }
    }
  }
  onToMainPage() {
    this.router.navigate(['/tickets-and-sessions']);
  }
}
