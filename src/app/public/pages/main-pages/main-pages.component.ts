import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styleUrl: './main-pages.component.css'
})
export class MainPagesComponent implements OnInit {
    role: string | null = '';

    constructor(
      private tokenService: TokenService,
    ) {
    }

  ngOnInit(): void {
      let token = localStorage.getItem('token');
      if (token) {
        this.role = this.tokenService.getRoleFromToken(token);
      }
      else {
        this.role = 'VISITOR';
      }
  }
}
