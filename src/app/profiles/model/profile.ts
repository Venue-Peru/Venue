export class Profile {
  id: number;
  username: string;
  name: string;
  email: number;
  bio: string;
  birthDate: Date;
  instagram: string;
  tiktok: string;
  icon: string;
  background: string;

  constructor() {
    this.id = 0;
    this.username = '';
    this.name = '';
    this.email = 0;
    this.instagram = '';
    this.tiktok = '';
    this.bio = '';
    this.birthDate = new Date();
    this.icon = '';
    this.background = '';
  }
}
