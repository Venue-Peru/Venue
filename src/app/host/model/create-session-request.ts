export class CreateSessionRequest {
  name: string;
  hostUuid: string;
  sessionImage: string;
  location: String;
  startDate: string;
  description: string;
  dj: string;
  dressCode: string;
  ageMinimum: number;
  musicType: string;

  constructor(name: string, hostUuid: string, sessionImage: string, location: String, startDate: string, description: string, dj: string, dressCode: string, ageMinimum: number, musicType: string) {
    this.name = name;
    this.hostUuid = hostUuid;
    this.sessionImage = sessionImage;
    this.location = location;
    this.startDate = startDate;
    this.description = description;
    this.dj = dj;
    this.dressCode = dressCode;
    this.ageMinimum = ageMinimum;
    this.musicType = musicType
  }
}
