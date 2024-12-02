export class Session {
  id: number;
  hostId: number;
  sessionImage: string;
  hostImage: string;
  name: string;
  hostName: string;
  location: string;
  date: string;
  time: string;
  description: string;
  dj: string;
  dressCode: string;
  ageMinimum: number;
  musicType: string;
  uuid: string;

  constructor() {
    this.id = 0;
    this.hostId = 0;
    this.sessionImage = '';
    this.hostImage = '';
    this.name = '';
    this.hostName = '';
    this.location = '';
    this.date = '';
    this.time = '';
    this.description = '';
    this.dj = '';
    this.dressCode = '';
    this.ageMinimum = 0;
    this.musicType = '';
    this.uuid = '';
  }
}
