import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-it-main-page',
  templateUrl: './it-main-page.component.html',
  styleUrl: './it-main-page.component.css'
})
export class ItMainPageComponent {
  carousels = [
    {
      title: 'A donde van tus amigos',
      items: [
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
      ]
    },
    {
      title: 'Cerca a ti (Barranco, Lima)',
      items: [
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
        {
          backgroundImage: '',
          sessionLogoImage: '',
          hostLogoImage: '',
        },
      ]
    }
  ]
  stories = [
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#ff0000',
      sessionToAttend: 'Cata',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#43dccf',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#ff20f4',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#ffcc00',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#f5f5f5',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#f5f5f5',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#f5f5f5',
      sessionToAttend: 'Dizco',
    },
    {
      profilePic: 'https://www.w3schools.com/w3images/lights.jpg',
      backgroundColor: '#f5f5f5',
      sessionToAttend: 'Dizco',
    }
  ]
  constructor(private router: Router) {}

  onToSession(id: number) {
    this.router.navigate(['/tickets-and-sessions/events']);
  }
}
