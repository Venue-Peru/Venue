import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MainSiteService} from "../../../_services/main-site.service";
import {SessionAtHeroSliderResponse} from "../../../_dtos/responses/session-at-hero-slider-response";
import {Session} from "../../../sessions/model/session";
import {CarouselsResponse} from "../../../_dtos/responses/carousels-response";

@Component({
  selector: 'app-it-main-page',
  templateUrl: './it-main-page.component.html',
  styleUrl: './it-main-page.component.css'
})
export class ItMainPageComponent implements OnInit {
  recommendations: Session[] | null = null;
  carousels: CarouselsResponse[] | null = null;
  somethingLoaded = false;

  constructor(
      private router: Router,
      private mainSiteService: MainSiteService,
  ) {}

  ngOnInit(): void {
    this.mainSiteService.getRecommendations().subscribe(
        sessions => {
          this.recommendations = sessions;
          this.somethingLoaded = true;
        },
        error => {
          this.recommendations = [];
          this.somethingLoaded = true;
        }
    )
    this.mainSiteService.getCarousels().subscribe(
        carousels => {
          this.carousels = carousels;
          this.somethingLoaded = true;
        },
        error => {
            this.somethingLoaded = true;
        }
    )
  }

  onToSession(id: number) {
    this.router.navigate(['/tickets-and-sessions/events']);
  }
}
