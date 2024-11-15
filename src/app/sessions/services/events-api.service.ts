import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {VenueEvent} from "../model/venue-event.entity";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventsApiService extends BaseService<VenueEvent> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "venue-sessions";
  }

  getById(eventId: number) {
    return this.http.get<VenueEvent>(`${this.basePath}${this.resourceEndpoint}/${eventId}`).pipe();
  }
}
