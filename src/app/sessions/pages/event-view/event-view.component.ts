import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EventsApiService} from "../../services/events-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VenueEvent} from "../../model/venue-event.entity";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements OnInit, AfterViewInit {
  event: VenueEvent = {} as VenueEvent;

  constructor(private eventsApiService: EventsApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventsApiService.getById(params['eventId']).subscribe(event => {
        this.event = event;
        console.log(this.event);
      });
    });
  }

}
