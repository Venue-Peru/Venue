export class EditProfileFieldsRequest {
  bio: string;
  birthDate: string;

  constructor(bio: string, birthDate: string) {
    this.bio = bio;
    this.birthDate = birthDate;
  }
}
