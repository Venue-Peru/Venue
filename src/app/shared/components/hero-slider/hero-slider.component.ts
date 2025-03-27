import {Component, Input, OnInit} from '@angular/core';
import {SessionAtHeroSliderResponse} from "../../../_dtos/responses/session-at-hero-slider-response";
import {Session} from "../../../sessions/model/session";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.css'
})
export class HeroSliderComponent implements OnInit {
  @Input() featuredSessions: Session[] | null = null;
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

  constructor(
      private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onToSession(session: Session) {
    this.router.navigate(['/tickets-and-sessions/events', session.uuid]);
  }

  isLoading(): boolean {
    return this.featuredSessions === null;
  }

  areThereFeaturedSession(): boolean {
    return this.featuredSessions != null && this.featuredSessions.length > 0;
  }
}
