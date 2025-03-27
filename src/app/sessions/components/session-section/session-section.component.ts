import {Component, Input, OnInit} from '@angular/core';
import {Session} from "../../model/session";
import {SessionRequestDto} from "../../../requests/model/session-request-dto";
import {TokenService} from "../../../shared/services/token.service";
import {ActivatedRoute} from "@angular/router";
import {SessionBraceletTypeResponse} from "../../../_dtos/responses/sessions/session-bracelet-type-response";
import {RequestsService} from "../../../requests/services/requests.service";
import {BraceletType} from "../../../_enums/bracelet-types";

@Component({
  selector: 'app-session-section',
  templateUrl: './session-section.component.html',
  styleUrl: './session-section.component.css'
})
export class SessionSectionComponent implements OnInit {
  @Input() session: Session = {} as Session;
  @Input() requestOptions: SessionBraceletTypeResponse[] = [];
  selectedRequest!: string;
  alreadyRequested: boolean = true;
  @Input() editMode: boolean = false;
  imageDialog: boolean = false;
  imageCache: File | null = null;

  constructor(
      private tokenService: TokenService,
      private route: ActivatedRoute,
      private requestsService: RequestsService
  ) {
  }

  ngOnInit(): void {
        if (this.requestOptions.length === 0) {
          this.requestOptions = [
              new SessionBraceletTypeResponse('Tengo código', '#ffffff', 'have_code', BraceletType.Unknown),
              new SessionBraceletTypeResponse('Basic', '#494646', 'basic', BraceletType.Blue),
              new SessionBraceletTypeResponse('Gold', '#d6c846', 'gold', BraceletType.Golden),
              new SessionBraceletTypeResponse('Silver', '#8c8c8c', 'silver', BraceletType.Silver),
              new SessionBraceletTypeResponse('VIP', '#ed6850', 'vip', BraceletType.Red),
          ]
        }
    }

    onClickingOption(key: string): void {
      this.selectedRequest = key;
    }

  onRequest() {
    if (!this.editMode) {
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
  }

  updateTitle(event: Event) {
    const target = event.target as HTMLElement;
    this.session.name = target.innerText;
  }

  updateDescription(event: Event) {
    const target = event.target as HTMLElement;
    this.session.description = target.innerText;
  }

  openImageDialog() {
    if (!this.editMode) {
      return;
    }
    this.imageDialog = true;
  }

  closeImageDialog() {
    this.imageDialog = false;
  }

  saveImageCache(event: { file: File | null, preview: string | ArrayBuffer | null | undefined }): void {
    this.imageCache = event.file;
    this.session.sessionImage = event.preview;
    this.imageDialog = false;
  }

  getSessionImage(): string | null {
    if (typeof this.session.sessionImage === "string") {
      return this.session.sessionImage;
    }
    return null;
  }
}
