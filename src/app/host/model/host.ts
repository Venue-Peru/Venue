export class Host {
  id: number;
  uuid: string;
  username: string;
  name: string;
  email: number;
  bio: string;
  birthdate: Date;
  instagram: string;
  tiktok: string;
  icon: string;
  background: string;

  constructor() {
    this.id = 0;
    this.uuid = '';
    this.username = '';
    this.name = '';
    this.email = 0;
    this.instagram = '';
    this.tiktok = '';
    this.bio = '';
    this.birthdate = new Date();
    this.icon = '';
    this.background = '';
  }
}
