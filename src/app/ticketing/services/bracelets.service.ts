import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Profile} from "../../profiles/model/profile";
import {HttpClient} from "@angular/common/http";
import {MiniBracelet} from "../model/mini-bracelet";
import {Bracelet} from "../model/bracelet";

@Injectable({
  providedIn: 'root'
})
export class BraceletsService extends BaseService<Profile> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "bracelets";
  }

  getUserBracelets(uuid: string) {
    return this.http.get<MiniBracelet[]>(`${this.basePath}${this.resourceEndpoint}/get-bracelets-of-user/${uuid}`).pipe();
  }

  getBraceletBySessionUuid(uuid: string) {
    return this.http.get<Bracelet>(`${this.basePath}${this.resourceEndpoint}/get-bracelet/${uuid}`).pipe();
  }
}
