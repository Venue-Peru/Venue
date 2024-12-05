export class PromoterCode {
  id: number;
  code: string;
  typableCode: number;
  sessionUuid: string;

  constructor() {
    this.id = 0;
    this.code = '';
    this.typableCode = 0;
    this.sessionUuid = '';
  }
}
