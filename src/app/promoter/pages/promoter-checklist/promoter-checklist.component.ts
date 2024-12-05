import { Component } from '@angular/core';
import {PromoterCodesService} from "../../../requests/services/promoter-codes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticatePromoterRequest} from "../../model/authenticate-promoter-request";
import {ProfileListItem} from "../../model/profile-list-item";

@Component({
  selector: 'app-promoter-checklist',
  templateUrl: './promoter-checklist.component.html',
  styleUrl: './promoter-checklist.component.css'
})
export class PromoterChecklistComponent {
  typableCode: string = '';
  visible: boolean = true;
  paginatedRequesters: ProfileListItem[] = [];
  constructor(
    private promoterCodesService: PromoterCodesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  showDialog() {
    this.visible = true;
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
}
