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
  sessions: Session[] | null = null;
  editDialogVisible_administration: boolean = false;
  selectedSession: Session = {} as Session;

  constructor(
    private sessionService: SessionsService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  loadingSessions(): boolean {
    return this.sessions == null;
  }

  areThereSessions(): boolean {
    return (this.sessions != null && this.sessions.length > 0);
  }

  ngOnInit() {
    // get uuid
    let uuid = this.tokenService.getUUIDFromToken(localStorage.getItem('token') || '') || '';
    this.sessionService.getAllByHostUuid(uuid).subscribe(sessions => {
      this.sessions = sessions;
      console.log(sessions);
    });
  }

  onAdministrateSession(session: Session) {
    this.selectedSession = session;
    this.editDialogVisible_administration = true;
  }

  onViewSession(session: Session) {
    this.router.navigate([`/tickets-and-sessions/events/${session.uuid}`]);
  }

  onEditSession(session: Session) {
    this.router.navigate([`/tickets-and-sessions/edit-event/${session.uuid}`]);
  }

  onSave_administration() {
  }

  onCancel_administration() {
    this.editDialogVisible_administration = false;
  }

}
