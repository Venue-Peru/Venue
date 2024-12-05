import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SessionRequestDto} from "../model/session-request-dto";
import {BaseService} from "../../shared/services/base.service";
import {ProfileFromSessionRequest} from "../model/profile-from-session-request";
import {PromoterCode} from "../model/promoter-code";
import {CreatePromoterCodeRequest} from "../model/create-promoter-code-request";
import {AuthenticatePromoterRequest} from "../../promoter/model/authenticate-promoter-request";
import {ProfileListItem} from "../../promoter/model/profile-list-item";

@Injectable({
  providedIn: 'root'
})
export class PromoterCodesService extends BaseService<PromoterCode> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "promoter-codes";
  }

  createPromoterCode(request: CreatePromoterCodeRequest) {
    return this.http.post<PromoterCode>(`${this.basePath}${this.resourceEndpoint}/create`, request).pipe();
  }

  getPromoterCodesBySessionUuid(sessionUuid: string) {
    return this.http.get<PromoterCode[]>(`${this.basePath}${this.resourceEndpoint}/get-by-session-uuid/${sessionUuid}`).pipe();
  }

  authenticatePromoterCode(authenticatePromoterCodeRequest: AuthenticatePromoterRequest) {
    return this.http.post<PromoterCode>(`${this.basePath}${this.resourceEndpoint}/authenticate`, authenticatePromoterCodeRequest).pipe();
  }
}
