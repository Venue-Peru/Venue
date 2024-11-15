export class Profile {
  id: number;
  fullName: string;
  age: number;
  friendCount: number;
  friendsInCommon: number;
  instagramUrl: string;
  tikTokUrl: string;
  backgroundImage: string;
  profileImage: string;
  constructor() {
    this.id = 0;
    this.fullName = '';
    this.age = 0;
    this.friendCount = 0;
    this.friendsInCommon = 0;
    this.instagramUrl = '';
    this.tikTokUrl = '';
    this.backgroundImage = '';
    this.profileImage = '';
  }
}
