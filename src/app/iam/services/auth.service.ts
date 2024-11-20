import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../environments/environment";
import {SignUpRequest} from "../model/sign-up-request";
import {SignUpResponse} from "../model/sign-up-response";
import {SignInRequest} from "../model/sign-in-request";
import {SignInResponse} from "../model/sign-in-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private http: HttpClient) { }
  get isSignedIn() { return this.signedIn.asObservable(); }
  get currentUserId() { return this.signedInUserId.asObservable(); }
  get currentUsername() { return this.signedInUsername.asObservable(); }

  /**
   * Sign up a new user
   * @summary
   * The method sends a POST request to the server with the sign-up request.
   * It subscribes to the response and error and logs the response or error.
   * @param signUpRequest - The {@link SignUpRequest} object
   */
  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}authentication/sign-up`,
      signUpRequest, this.httpOptions)
  .subscribe({
        next: (response) => {
      console.log(`Signed up as ${response.username} with id ${response.id}`);
      this.router.navigate(['/']).then();
    },
    error: (error) => {
      console.error(`Error signing up: ${error}`);
      this.router.navigate(['/register']).then();
    }
  })
  }

  /**
   62	+
   * Sign in a user
   63	+
   * @summary
   * The method sends a POST request to the server with the sign-in request.
   * It subscribes to the response and error and logs the response or error.
   * @param signInRequest - The {@link SignInRequest} object
   */
  signIn(signInRequest: SignInRequest) {
    console.log(`Signing in as ${signInRequest.username}`);
    return this.http.post<SignInResponse>(`${this.basePath}authentication/sign-in`,
      signInRequest, this.httpOptions)
  .subscribe({
        next: (response) => {
      this.signedIn.next(true);
      this.signedInUserId.next(response.id);
      this.signedInUsername.next(response.username);
      localStorage.setItem('token', response.token);
      console.log(`Signed in as ${response.username} with token ${response.token}`);
      this.router.navigate(['/tickets-and-sessions']).then();
    },
    error: (error) => {
      this.signedIn.next(false);
      this.signedInUserId.next(0);
      this.signedInUsername.next('');
      console.error(`Error while signing in: ${error}`);
      this.router.navigate(['/']).then();
    }
  });
  }

  /**
   * Sign out the user
   */
  signOut() {
    localStorage.removeItem('token');
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    this.router.navigate(['/']).then();
  }
}
