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
  requestOptions = [
    { name: 'General', key: 'G' },
    { name: 'VIP', key: 'V' },
    { name: 'Super VIP', key: 'SV' },
    { name: 'Box 1', key: 'B1' },
    { name: 'Box 2', key: 'B2' },
    { name: 'Ya tengo código', key: 'C' },
  ]
  selectedRequest!: string;
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

  onRequest() {
    // get the selected request index
    const selectedRequestIndex = this.requestOptions.findIndex(option => option.name === this.selectedRequest);
    // get uuid clean
    let uuidPromise = this.tokenService.getUUIDFromToken(localStorage.getItem('token') ?? '');
    let uuid = '';
    if (uuidPromise != null) {
      uuid = uuidPromise;
    }
    this.route.params.subscribe(params => {
      if (params['eventId']) {
        let request: SessionRequestDto = {
          sessionUuid: params['eventId'],
          profileUuid: uuid,
          desiredCategory: selectedRequestIndex
        };
        this.requestsService.createRequest(request).subscribe(
          response => {
            this.alreadyRequested = true;
            //this.onToastSuccess('Success', 'Request sent successfully');
          },
          error => {
            //this.onToastFailure('Error', 'Request already sent or not logged in');
          }
        );
      }
    });
  }

  /*
  onToastSuccess(summary: string, detail: string) {
    this.messageService.add({severity: 'success', summary: summary, detail: detail});
  }

  onToastFailure(summary: string, detail: string) {
    this.messageService.add({severity: 'error', summary: summary, detail: detail});
  }
   */
}
