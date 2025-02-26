import {Component, OnInit} from '@angular/core';
import {SessionsService} from "../../services/sessions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../../model/session";
import {RequestsService} from "../../../requests/services/requests.service";
import {SessionRequestDto} from "../../../requests/model/session-request-dto";
import {TokenService} from "../../../shared/services/token.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-session-visitor',
  templateUrl: './session-visitor.component.html',
  styleUrl: './session-visitor.component.css'
})
export class SessionVisitorComponent implements OnInit {
  start: boolean | null = false;
  alreadyRequested: boolean = true;
  session: Session = {} as Session;

  constructor(
    private sessionsService: SessionsService,
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: RequestsService,
    private tokenService: TokenService,
    // private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['eventId']) {
        this.sessionsService.getByUuid(params['eventId']).subscribe(
          session => {
            this.start = true;
            this.session = session;
            this.getAlreadyRequestedByUser(params['eventId']);
          },
          error => {
            this.start = null;
          }
        )
      } else {
        this.start = null;
      }
    });
  }

  getAlreadyRequestedByUser(sessionUuid: string) {
    this.requestsService.getAlreadyRequestedByUser(sessionUuid).subscribe(
      response => {
        this.alreadyRequested = true;
      },
      error => {
        this.alreadyRequested = false;
      }
    );
  }
}
