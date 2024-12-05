import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Session} from "../model/session";
import {Host} from "../../host/model/host";
import {CreateSessionRequest} from "../../host/model/create-session-request";

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends BaseService<Session> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "sessions";
  }

  getByUuid(uuid: string) {
    return this.http.get<Session>(`${this.basePath}${this.resourceEndpoint}/${uuid}`).pipe();
  }

  createSession(createSessionRequest: CreateSessionRequest) {
    return this.http.post<Session>(`${this.basePath}${this.resourceEndpoint}/post-beta`, createSessionRequest).pipe();
  }

  updateImage(uuid: String, icon: String) {
    return this.http.put<Session>(`${this.basePath}${this.resourceEndpoint}/update-image/${uuid}`, {icon}).pipe();
  }

  getAllByHostUuid(hostUuid: string) {
    return this.http.get<Session[]>(`${this.basePath}${this.resourceEndpoint}/sessions-by-host/${hostUuid}`).pipe();
  }

  getAllBySearchQuery(query: string) {
    return this.http.get<Session[]>(`${this.basePath}${this.resourceEndpoint}/sessions-by-search-bar/${query}`).pipe();
  }
}
