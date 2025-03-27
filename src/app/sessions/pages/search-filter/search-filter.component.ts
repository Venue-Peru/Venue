import {Component, OnInit} from '@angular/core';
import {SessionsService} from "../../services/sessions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../../model/session";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent implements OnInit {
  typeValue: number = 1;
  types: any[] = [
    { name: 'Sessions', value: 1 },
    { name: 'Hosts', value: 2 },
    { name: 'Users', value: 3 }
  ];
  sidebarToggle = false;
  // sessions-exclusive
  sessionTypeValue: number = 2;
  sessionType: any[] = [
      { name: 'Disco', value: 1 },
      { name: 'Bar', value: 2 },
  ]
  //
  sessions: Session[] = [];
  selectedCategories: string[] = [];
  selectedRatings: number[] = [];
  priceRange: number[] = [0, 100];
  categories = [
    { label: 'Music', value: 'music' },
    { label: 'Art', value: 'art' },
    { label: 'Tech', value: 'tech' },
  ];

  constructor(
    private sessionService: SessionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  onVisitingSession(session: Session) {
    this.router.navigate(['/tickets-and-sessions/events', session.uuid]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let query = params['q'];
      this.sessionService.getAllBySearchQuery(query).subscribe(sessions => {
        this.sessions = sessions;
      });
    });
  }

  openSidebar(): void {
    this.sidebarToggle = !this.sidebarToggle;
  }
}
