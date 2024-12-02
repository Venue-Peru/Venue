import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrl: './host-dashboard.component.css'
})
export class HostDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  onToCreateSession() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/create-session']);
  }

  onToObserveSessions() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/my-sessions']);
  }

  ngOnInit(): void {
  }
}
