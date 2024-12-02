import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";
import {ProfilesService} from "../../../profiles/services/profiles.service";

@Component({
  selector: 'app-host-navbar',
  templateUrl: './host-navbar.component.html',
  styleUrl: './host-navbar.component.css'
})
export class HostNavbarComponent implements OnInit {
  icon: string = 'null';

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private profilesService: ProfilesService
  ) {
  }
  onToProfile() {
    let token = localStorage.getItem('token');
    if (token != null) {
      let uuid = this.tokenService.getUUIDFromToken(token);
      if (uuid != null) {
        this.router.navigate(['/tickets-and-sessions/host/' + uuid]);
      }
    }
  }
  onToMainPage() {
    this.router.navigate(['/tickets-and-sessions']);
  }

  onToDashboard() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard']);
  }

  ngOnInit(): void {
    // get uuid safely
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) {
      return;
    }
    this.profilesService.getByUUIDWithString(uuid).subscribe(
      profile => {
        this.icon = profile.icon;
      },
      error => {
        this.icon = '';
      }
    );
  }
}
