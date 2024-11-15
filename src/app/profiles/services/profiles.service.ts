import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Profile} from "../model/profile";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService extends BaseService<Profile> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "profiles";
  }

  getById(id: number) {
    return this.http.get<Profile>(`${this.basePath}${this.resourceEndpoint}/${id}`).pipe();
  }
}
