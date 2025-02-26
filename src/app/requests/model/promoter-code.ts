export class PromoterCode {
  id: number;
  code: string;
  typableCode: number;
  sessionUuid: string;
  initialPermissions: number;
  permissions: number;

  constructor() {
    this.id = 0;
    this.code = '';
    this.typableCode = 0;
    this.sessionUuid = '';
    this.initialPermissions = 0;
    this.permissions = 0;
  }
}
