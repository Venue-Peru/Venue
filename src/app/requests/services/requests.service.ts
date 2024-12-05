import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProfileFromSessionRequest} from "../model/profile-from-session-request";
import {HttpClient} from "@angular/common/http";
import {SessionRequestDto} from "../model/session-request-dto";
import {ProfileListItem} from "../../promoter/model/profile-list-item";
import {SessionRequestInteraction} from "../../promoter/model/session-request-interaction";

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends BaseService<ProfileFromSessionRequest> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "session-requests";
  }

  createRequest(request: SessionRequestDto) {
    return this.http.post(`${this.basePath}${this.resourceEndpoint}/create`, request).pipe();
  }

  getProfilesThroughSessionUuid(requestUuid: string) {
    return this.http.get<ProfileListItem[]>(`${this.basePath}${this.resourceEndpoint}/get-profiles-through-session-uuid/${requestUuid}`).pipe();
  }

  acceptRequest(requestInteraction: SessionRequestInteraction) {
    return this.http.post<ProfileListItem[]>(`${this.basePath}${this.resourceEndpoint}/accept`, requestInteraction).pipe();
  }

  rejectRequest(requestInteraction: SessionRequestInteraction) {
    return this.http.post<ProfileListItem[]>(`${this.basePath}${this.resourceEndpoint}/reject`, requestInteraction).pipe();
  }
}
