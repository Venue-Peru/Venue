import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProfileFromSessionRequest} from "../model/profile-from-session-request";
import {HttpClient} from "@angular/common/http";
import {SessionRequestDto} from "../model/session-request-dto";

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
}
