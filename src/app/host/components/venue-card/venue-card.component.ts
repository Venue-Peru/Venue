import {Component, Input} from '@angular/core';
import {VenueResponse} from "../../../_dtos/responses/venue-response";

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrl: './venue-card.component.css'
})
export class VenueCardComponent {
    @Input() venue: VenueResponse = new VenueResponse('','','');
}
