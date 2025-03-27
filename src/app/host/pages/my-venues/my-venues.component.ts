import { Component } from '@angular/core';
import {VenueResponse} from "../../../_dtos/responses/venue-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-venues',
  templateUrl: './my-venues.component.html',
  styleUrl: './my-venues.component.css'
})
export class MyVenuesComponent {
  venues: VenueResponse[] = [
      new VenueResponse('Pacha Diaz', '', 'Urb. 74. San Borja')
  ]

  constructor(private router: Router) { }

  onToCreateVenue() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/create-venue']);
  }
}
