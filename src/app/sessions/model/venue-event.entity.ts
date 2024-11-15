export class VenueEvent {
  id: number;
  uuid: string;
  // HERO
  name: string;
  description: string;
  image: string;
  // MAIN_DISCRIMINATORS
  date: string;
  startTime: string;
  dressCode: string;
  venueLocation: string;
  ageRestriction: string;


  constructor() {
    this.id = 0;
    this.uuid = '';
    this.name = '';
    this.description = '';
    this.dressCode = '';
    this.venueLocation = '';
    this.ageRestriction = '';
    this.date = '';
    this.startTime = '';
    this.image = '';
  }
}
