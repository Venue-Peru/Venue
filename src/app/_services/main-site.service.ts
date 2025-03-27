import { Injectable } from '@angular/core';
import {BaseService} from "../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Session} from "../sessions/model/session";
import {CarouselsResponse} from "../_dtos/responses/carousels-response";

@Injectable({
  providedIn: 'root'
})
export class MainSiteService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "main-site";
  }

  getRecommendations() {
    return this.http.get<Session[]>(`${this.basePath}${this.resourceEndpoint}/recommendations`);
  }

  getCarousels() {
    return this.http.get<CarouselsResponse[]>(`${this.basePath}${this.resourceEndpoint}/carousels`);
  }
}
