export class CreatePromoterCodeRequest {
  sessionUuid: string;
  permissions: number;

  constructor(sessionUuid: string, permissions: number) {
    this.sessionUuid = sessionUuid;
    this.permissions = permissions
  }
}
