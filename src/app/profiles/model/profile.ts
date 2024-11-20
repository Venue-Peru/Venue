export class Profile {
  id: number;
  username: string;
  name: string;
  email: number;
  bio: string;
  birthdate: Date;
  instagram: string;
  tiktok: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.name = '';
    this.email = 0;
    this.instagram = '';
    this.tiktok = '';
    this.bio = '';
    this.birthdate = new Date();
  }
}
