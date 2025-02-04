import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../../profiles/model/profile";
import {BaseService} from "../../shared/services/base.service";
import {Host} from "../model/host";
import {Session} from "../../sessions/model/session";
import {EditHostFieldsRequest} from "../model/edit-host-fields-request";

@Injectable({
  providedIn: 'root'
})
export class HostService extends BaseService<Host> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "hosts";
  }

  getByUUID(uuid: number) {
    return this.http.get<Host>(`${this.basePath}${this.resourceEndpoint}/${uuid}`).pipe();
  }

  getByUUIDWithString(uuid: String) {
    return this.http.get<Host>(`${this.basePath}${this.resourceEndpoint}/${uuid}`).pipe();
  }

  updateBackground(uuid: String, background: String) {
    return this.http.put<Host>(`${this.basePath}${this.resourceEndpoint}/${uuid}/background`, {background}).pipe();
  }

  updateIcon(uuid: String, icon: String) {
    return this.http.put<Host>(`${this.basePath}${this.resourceEndpoint}/${uuid}/icon`, {icon}).pipe();
  }

  updateFields(uuid: String, fields: EditHostFieldsRequest) {
    return this.http.put<Host>(`${this.basePath}${this.resourceEndpoint}/${uuid}/fields`, fields).pipe();
  }
}
