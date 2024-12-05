/*
String code,
        String typableCode,
        Long id,
        Long promoterCodeId
 */

export class SessionRequestInteraction {
  code: string;
  typableCode: string;
  id: number;
  promoterCodeId: number;

  constructor(code: string, typableCode: string, id: number, promoterCodeId: number) {
    this.code = code;
    this.typableCode = typableCode;
    this.id = id;
    this.promoterCodeId = promoterCodeId;
  }
}
