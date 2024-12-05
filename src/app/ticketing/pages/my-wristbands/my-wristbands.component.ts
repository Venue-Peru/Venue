import {Component, OnInit} from '@angular/core';
import {HostsApiService} from "../../services/hosts-api.service";
import {VenueHost} from "../../model/venuehost.entity";
import {BraceletsService} from "../../services/bracelets.service";
import {TokenService} from "../../../shared/services/token.service";
import {MiniBracelet} from "../../model/mini-bracelet";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-wristbands',
  templateUrl: './my-wristbands.component.html',
  styleUrl: './my-wristbands.component.css'
})
export class MyWristbandsComponent implements OnInit {
  miniBracelets: MiniBracelet[] = [];

  constructor(
    private braceletsService: BraceletsService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let uuid = this.tokenService.getUUIDFromToken(localStorage.getItem('token') || '') || '';
    this.braceletsService.getUserBracelets(uuid).subscribe((bracelets) => {
      this.miniBracelets = bracelets;
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  onClickingBracelet(bracelet: MiniBracelet) {
    this.router.navigate(['/tickets-and-sessions/my-wristbands/' + bracelet.sessionUuid]);
  }
}
