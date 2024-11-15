import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {
  }
  onToProfile() {
    this.router.navigate(['/tickets-and-sessions/view/1']);
  }
  onToMainPage() {
    this.router.navigate(['/tickets-and-sessions']);
  }
}
