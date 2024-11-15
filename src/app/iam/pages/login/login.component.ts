import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SignInRequest} from "../../model/sign-in-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm = {
    username: '',
    password: '',
  }
  constructor(private router: Router, private authService: AuthService) {
  }
  onLogin() {
    console.log('Login');
    let signInRequest: SignInRequest = {
      username: this.signInForm.username,
      password: this.signInForm.password
    }
    this.authService.signIn(signInRequest);
  }

  onToRegister() {
    this.router.navigate(['/register']);
  }
}
