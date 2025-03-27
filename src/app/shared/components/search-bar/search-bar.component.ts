import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  search: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.navigateToSearch();
    }
  }

  onSearch() {
    this.navigateToSearch();
  }

  private navigateToSearch() {
    this.router.navigate(['/tickets-and-sessions/search'], { queryParams: { q: this.search } });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!params['q']) {
        return;
      }
      this.search = params['q'];
    });
  }
}
