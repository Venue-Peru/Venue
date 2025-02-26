import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})
export class HostDashboardComponent implements OnInit {
  username: string | null = null;

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  onToCreateSession() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/create-session']);
  }

  onToObserveSessions() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/my-sessions']);
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUsernameFromToken(this.tokenService.getToken());
  }
}
