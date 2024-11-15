import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {VenueEvent} from "../../sessions/model/venue-event.entity";
import {BaseService} from "../../shared/services/base.service";
import {VenueHost} from "../model/venuehost.entity";

@Injectable({
  providedIn: 'root'
})
export class HostsApiService extends BaseService<VenueHost> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "hosts";
  }

  getById(eventId: number) {
    return this.http.get<VenueEvent>(`${this.basePath}${this.resourceEndpoint}/${eventId}`).pipe();
  }
}
