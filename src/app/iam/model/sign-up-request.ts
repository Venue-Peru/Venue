/**
 * Model class for SignUpRequest
 */
export class SignUpRequest {
  public username: string;
  public password: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public identityCard: string;

  /**
   * Constructor for SignUpRequest
   * @param username The username
   * @param password The password
   * @param email The email
   * @param firstName The first name
   * @param lastName The last name
   * @param identityCard The identity card number (DNI, etc.)
   */
  constructor(username: string, password: string, email: string, firstName: string, lastName: string, identityCard: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.identityCard = identityCard;
  }
}
