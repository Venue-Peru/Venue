import {Component, OnInit} from '@angular/core';
import {BraceletsService} from "../../services/bracelets.service";
import {Bracelet} from "../../model/bracelet";
import {ActivatedRoute} from "@angular/router";
import {ProfilesService} from "../../../profiles/services/profiles.service";
import {FragileProfile} from "../../../profiles/model/fragile-profile";

@Component({
  selector: 'app-session-ticket',
  templateUrl: './session-ticket.component.html',
  styleUrl: './session-ticket.component.css'
})
export class SessionTicketComponent implements OnInit {
  bracelet: Bracelet = {} as Bracelet;
  fragileProfile: FragileProfile = {} as FragileProfile;

  constructor(
    private braceletsService: BraceletsService,
    private profilesService: ProfilesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let sessionUuid = params['wristbandId'];
      this.braceletsService.getBraceletBySessionUuid(sessionUuid).subscribe(bracelet => {
        this.bracelet = bracelet;
        this.profilesService.getFragileByAuthentication().subscribe(profile => {
          this.fragileProfile = profile;
        });
      });
    });
  }


}
