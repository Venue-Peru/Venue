import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SignUpRequest} from "../../model/sign-up-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signUpForm = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    identityCard: ''
  }
  constructor(private router: Router, private authService: AuthService) {
  }
  onRegister() {
    console.log('Register');
    let signUpRequest: SignUpRequest = {
      username: this.signUpForm.username,
      password: this.signUpForm.password,
      email: this.signUpForm.email,
      firstName: this.signUpForm.firstName,
      lastName: this.signUpForm.lastName,
      identityCard: this.signUpForm.identityCard
    }
    this.authService.signUp(signUpRequest);
  }
  onToLogin() {
    this.router.navigate(['/']);
  }
}
