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
  sessions: Session[] = [];
  editDialogVisible_administration: boolean = false;
  selectedSessionUuid: string = '';

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

  onAdministrateSession(session: Session) {
    this.selectedSessionUuid = session.uuid;
    this.editDialogVisible_administration = true;
  }

  onViewSession(session: Session) {
    this.router.navigate([`/tickets-and-sessions/events/${session.uuid}`]);
  }

  onClickingAdministate() {
    this.editDialogVisible_administration = true;
  }

  onSave_administration() {
  }

  onCancel_administration() {
    this.editDialogVisible_administration = false;
  }

}
