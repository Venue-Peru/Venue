import {Component, Input} from '@angular/core';
import {VenueEvent} from "../../model/venue-event.entity";

@Component({
  selector: 'app-event-hero-widget',
  templateUrl: './event-hero-widget.component.html',
  styleUrl: './event-hero-widget.component.css'
})
export class EventHeroWidgetComponent {
  @Input() event: VenueEvent = {} as VenueEvent;
}
