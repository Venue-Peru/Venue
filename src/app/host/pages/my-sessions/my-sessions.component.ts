import {Component, OnInit} from '@angular/core';
import {Session} from "../../../sessions/model/session";
import {Router} from "@angular/router";
import {SessionsService} from "../../../sessions/services/sessions.service";
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-my-sessions',
  templateUrl: './my-sessions.component.html',
  styleUrl: './my-sessions.component.css'
})
export class MySessionsComponent implements OnInit {
  focusedSession: Session | null = null;
  sessions: Session[] = [];
  constructor(
    private sessionService: SessionsService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    // get uuid
    let uuid = this.tokenService.getUUIDFromToken(localStorage.getItem('token') || '') || '';
    this.sessionService.getAllByHostUuid(uuid).subscribe(sessions => {
      this.sessions = sessions;
      console.log(sessions);
    });
  }

  administrateSession(session: Session) {
    this.router.navigate([`/tickets-and-sessions/administrate-session/${session.uuid}`]);
  }

  viewSession(session: Session) {
    this.router.navigate([`/tickets-and-sessions/events/${session.uuid}`]);
  }


}
