import { Component } from '@angular/core';
import {PromoterCodesService} from "../../../requests/services/promoter-codes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticatePromoterRequest} from "../../model/authenticate-promoter-request";
import {ProfileListItem} from "../../model/profile-list-item";
import {SessionRequestInteraction} from "../../model/session-request-interaction";
import {RequestsService} from "../../../requests/services/requests.service";
import {PromoterCode} from "../../../requests/model/promoter-code";

@Component({
  selector: 'app-promoter-checklist',
  templateUrl: './promoter-checklist.component.html',
  styleUrl: './promoter-checklist.component.css'
})
export class PromoterChecklistComponent {
  typableCode: string = '';
  promoterCode: PromoterCode = {} as PromoterCode;
  visible: boolean = true;
  paginatedRequesters: ProfileListItem[] | null = null;
  selectedRequester: ProfileListItem | null = null;
  loadProfile: boolean = false;

  constructor(
    private promoterCodesService: PromoterCodesService,
    private requestsService: RequestsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  showDialog() {
    this.visible = true;
  }

  onRequesterClick(requester: ProfileListItem) {
    if (this.selectedRequester === requester) {
      this.selectedRequester = null;
      this.loadProfile = false;
      return;
    }
    this.selectedRequester = requester;
    this.loadProfile = true;
  }

  onAuthenticating() {
    // get the first code from route params
    this.route.params.subscribe(params => {
      let code = params['code'];
      let authenticatePromoterRequest = new AuthenticatePromoterRequest(
        code,
        // convert the typable code to number
        Number(this.typableCode)
      );
      this.promoterCodesService.authenticatePromoterCode(authenticatePromoterRequest).subscribe(
        (promoterCode) => {
          this.visible = false;
          this.promoterCode = promoterCode;
          this.requestsService.getProfilesThroughSessionUuid(promoterCode.sessionUuid).subscribe(
            (profiles) => {
              this.paginatedRequesters = profiles;
            },
            (error) => {
              this.paginatedRequesters = [];
            }
          );
        },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  onShowProfile(requester: ProfileListItem) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/tickets-and-sessions/view/' + requester.profileUuid])
    );
    window.open(url, '_blank');  }

  onAcceptRequest(requester: ProfileListItem) {
    this.route.params.subscribe(params => {
      let code = params['code'];
      let sessionRequestInteraction = new SessionRequestInteraction(
        code,
        this.typableCode,
        requester.id,
        this.promoterCode.id
      );
      this.requestsService.acceptRequest(sessionRequestInteraction).subscribe(
        (profiles) => {
          this.paginatedRequesters = profiles;
          this.visible = false;
        },
        (error) => {
          console.log(error);
        }
      )
    });
  }

  onRejectRequest(requester: ProfileListItem) {

  }
}
