export class FragileProfile {
  id: number;
  uuid: string;
  username: string;
  email: number;
  identityCard: string;
  name: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.name = '';
    this.email = 0;
    this.identityCard = '';
    this.uuid = '';
  }
}
