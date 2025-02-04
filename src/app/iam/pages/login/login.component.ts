import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SignInRequest} from "../../model/sign-in-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  failure: boolean | null | string = null;
  progressLocation = {
    x: 0,
    y: 0
  }
  signInForm = {
    username: '',
    password: '',
  }
  constructor(private router: Router, private authService: AuthService) {
  }
  onLogin(event: MouseEvent) {
    console.log('Login');
    this.failure = false;
    // get location of cursor
    this.progressLocation.x = event.clientX;
    this.progressLocation.y = event.clientY;
    // handle if the form is valid
    if (this.signInForm.username === '' || this.signInForm.password === '') {
      this.failure = 'incomplete';
      return;
    }
    let signInRequest: SignInRequest = {
      username: this.signInForm.username,
      password: this.signInForm.password
    }
    this.authService.signIn(signInRequest);
  }

  onToRegister() {
    this.router.navigate(['/register']);
  }

  onToForgotPassword() {
    // this.router.navigate(['/forgot-password']);
  }

  ngOnInit(): void {
    this.authService.signInError$.subscribe((errorOccurred) => {
      if (errorOccurred) {
        this.failure = true;
      }
    });
  }
}
