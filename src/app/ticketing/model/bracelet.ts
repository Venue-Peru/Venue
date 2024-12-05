export class Bracelet {
  sessionUuid: string;
  category: number;
  name: string;
  sessionImage: string;
  location: string;
  startDate: string;
  description: string;
  dj: string;
  dressCode: string;
  ageMinimum: number;
  musicType: string;
  qrCode: Uint8Array; // Byte array for binary QR code (optional use)
  qrCodeBase64: string; // Base64-encoded QR code

  constructor() {
    this.sessionUuid = '';
    this.category = 0;
    this.name = '';
    this.sessionImage = '';
    this.location = '';
    this.startDate = '';
    this.description = '';
    this.dj = '';
    this.dressCode = '';
    this.ageMinimum = 0;
    this.musicType = '';
    this.qrCode = new Uint8Array();
    this.qrCodeBase64 = '';
  }
}
