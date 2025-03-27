import {Component, OnInit} from '@angular/core';
import {Session} from "../../model/session";
import {SessionsService} from "../../services/sessions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../../../requests/services/requests.service";
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-session-editor',
  templateUrl: './session-editor.component.html',
  styleUrl: './session-editor.component.css'
})
export class SessionEditorComponent implements OnInit {
    offsetTop = 3.4;
    offsetLeft = 25;
    scale = 1.2;

    editTypeValue = 1;
    editTypes: any[] = [
        { name: 'Edición de Icono', value: 1 },
        { name: 'Edición de Perfil', value: 2 },
        { name: 'Edición de Business Logic', value: 3 },
    ];

    braceletsPresent: any[] = [
        { name: 'Basic', color: { name: 'Blue', value: 2, acronym: 'blue' } },
        { name: 'Gold', color: { name: 'Golden', value: 3, acronym: 'golden' } },
        { name: 'Silver', color: { name: 'Silver', value: 7, acronym: 'silver' } },
        { name: 'VIP', color: { name: 'Red', value: 6, acronym: 'red' }},
    ];

    braceletCodePermit = true;

    braceletColorTypes: any[] = [
        { name: 'Basic', value: 1, acronym: 'basic' },
        { name: 'Blue', value: 2, acronym: 'blue' },
        { name: 'Golden', value: 3, acronym: 'golden' },
        { name: 'Green', value: 4, acronym: 'green' },
        { name: 'Purple', value: 5, acronym: 'purple' },
        { name: 'Red', value: 6, acronym: 'red' },
        { name: 'Silver', value: 7, acronym: 'silver' },
    ]

    highImagePreview: string | ArrayBuffer | null = 'chanel.png';
    highFile: File | null = null;
    backgroundImagePreview: string | ArrayBuffer | null = 'white-background.webp';
    backgroundFile: File | null = null;

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

    onBackgroundFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.backgroundFile = file;
            const reader = new FileReader();
            reader.onload = (e) => this.backgroundImagePreview = reader.result;
            reader.readAsDataURL(file);
        }
    }

    onHighFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.highFile = file;
            const reader = new FileReader();
            reader.onload = (e) => this.highImagePreview = reader.result;
            reader.readAsDataURL(file);
        }
    }
}
