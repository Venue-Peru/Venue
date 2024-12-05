import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Profile} from "../model/profile";
import {HttpClient} from "@angular/common/http";
import {FragileProfile} from "../model/fragile-profile";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends BaseService<Profile> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "profiles";
  }

  getByUUID(uuid: number) {
    return this.http.get<Profile>(`${this.basePath}${this.resourceEndpoint}/${uuid}`).pipe();
  }

  getByUUIDWithString(uuid: String) {
    return this.http.get<Profile>(`${this.basePath}${this.resourceEndpoint}/${uuid}`).pipe();
  }

  getFragileByAuthentication() {
    return this.http.get<FragileProfile>(`${this.basePath}${this.resourceEndpoint}/fragile`).pipe();
  }

  updateBackground(uuid: String, background: String) {
    return this.http.put<Profile>(`${this.basePath}${this.resourceEndpoint}/${uuid}/background`, {background}).pipe();
  }

  updateIcon(uuid: String, icon: String) {
    return this.http.put<Profile>(`${this.basePath}${this.resourceEndpoint}/${uuid}/icon`, {icon}).pipe();
  }
}
