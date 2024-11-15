import {Component, Input} from '@angular/core';
import {VenueEvent} from "../../model/venue-event.entity";

@Component({
  selector: 'app-main-discriminators-widget',
  templateUrl: './main-discriminators-widget.component.html',
  styleUrl: './main-discriminators-widget.component.css'
})
export class MainDiscriminatorsWidgetComponent {
  @Input() event: VenueEvent = {} as VenueEvent;
}
