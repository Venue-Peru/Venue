import { Injectable } from '@angular/core';
import {BaseService} from "../shared/services/base.service";
import {VenueResponse} from "../_dtos/responses/venue-response";
import {HttpClient} from "@angular/common/http";
import {Session} from "../sessions/model/session";
import {CarouselsResponse} from "../_dtos/responses/carousels-response";
import {CreateVenueRequest} from "../_dtos/requests/create-venue-request";

@Injectable({
  providedIn: 'root'
})
export class VenuesService extends BaseService<VenueResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "venue";
  }

  createVenue(request: CreateVenueRequest) {
    return this.http.post<VenueResponse>(`${this.basePath}${this.resourceEndpoint}/create`, request).pipe();
  }

  getVenueByUuid(uuid: string) {
    return this.http.get<VenueResponse>(`${this.basePath}${this.resourceEndpoint}/get/${uuid}`);
  }

  getVenuesByAuthentication() {
    return this.http.get<VenueResponse[]>(`${this.basePath}${this.resourceEndpoint}`);
  }

}
