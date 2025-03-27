import {Component, Input} from '@angular/core';
import {CarouselsResponse} from "../../../_dtos/responses/carousels-response";
import {Session} from "../../../sessions/model/session";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() carousels: CarouselsResponse[] | null = null;

  constructor(
      private router: Router,
  ) {
  }

  areThereCarousels(): boolean {
    return this.carousels != null;
  }

  onWheel(event: WheelEvent): void {
    // Prevent the default vertical scroll behavior
    event.preventDefault();

    // The event's currentTarget should be the carousel container.
    const container = event.currentTarget as HTMLElement;

    // Use the deltaY (vertical scroll amount) to scroll horizontally
    container.scrollLeft += event.deltaY;
  }

  onToSession(session: Session) {
    this.router.navigate(['/tickets-and-sessions/events', session.uuid]);
  }
}
