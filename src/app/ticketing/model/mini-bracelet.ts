/*
String sessionUuid,
        Long category,
        String name,
        String sessionImage,
        String location,
        String startDate,
        String description,
        String dj,
        String dressCode,
        Long ageMinimum,
        String musicType
 */
export class MiniBracelet {
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
  }
}
