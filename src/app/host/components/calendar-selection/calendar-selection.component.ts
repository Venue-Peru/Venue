import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-selection',
  templateUrl: './calendar-selection.component.html',
  styleUrl: './calendar-selection.component.css'
})
export class CalendarSelectionComponent implements OnInit {
  minDate: Date | undefined = new Date();

  ngOnInit(): void {
  }
}
