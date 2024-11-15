import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Session} from "../model/session";

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends BaseService<Session> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "sessions";
  }

  getById(id: number) {
    return this.http.get<Session>(`${this.basePath}${this.resourceEndpoint}/${id}`).pipe();
  }
}
