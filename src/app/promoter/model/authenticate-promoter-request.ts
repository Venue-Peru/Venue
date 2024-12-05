export class AuthenticatePromoterRequest {
  code: string;
  typableCode: number;

  constructor(code: string, typableCode: number) {
    this.code = code;
    this.typableCode = typableCode;
  }
}
