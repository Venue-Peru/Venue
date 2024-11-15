import {Component, OnInit} from '@angular/core';
import {SessionsService} from "../../services/sessions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../../model/session";

@Component({
  selector: 'app-session-visitor',
  templateUrl: './session-visitor.component.html',
  styleUrl: './session-visitor.component.css'
})
export class SessionVisitorComponent implements OnInit {
  start: boolean | null = false;
  requestOptions = [
    { name: 'General', key: 'G' },
    { name: 'VIP', key: 'V' },
    { name: 'Super VIP', key: 'SV' },
    { name: 'Box 1', key: 'B1' },
    { name: 'Box 2', key: 'B2' },
    { name: 'Ya tengo código', key: 'C' },
  ]
  selectedRequest!: string;
  session: Session = {} as Session;

  constructor(
    private sessionsService: SessionsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionsService.getById(1).subscribe(
      session => {
      this.start = true;
      this.session = session;
    },
    error => {
      this.start = null;
    }
    )
  }

}
