export class EditHostFieldsRequest {
  name: string;
  bio: string;

  constructor(name: string, bio: string) {
    this.name = name;
    this.bio = bio;
  }
}
