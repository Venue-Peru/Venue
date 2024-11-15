export class Post {
  id: number;
  profileImage: string;
  fullName: string;
  time: string;
  hostImage: string;
  sessionName: string;
  content: string;
  photos: string[];
  likes: number;
  views: number;

  constructor() {
    this.id = 0;
    this.profileImage = '';
    this.fullName = '';
    this.time = '';
    this.hostImage = '';
    this.sessionName = '';
    this.content = '';
    this.photos = [];
    this.likes = 0;
    this.views = 0;
  }
}
