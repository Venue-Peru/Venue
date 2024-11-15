import {Component, OnInit} from '@angular/core';
import {HostsApiService} from "../../services/hosts-api.service";
import {VenueHost} from "../../model/venuehost.entity";

@Component({
  selector: 'app-my-wristbands',
  templateUrl: './my-wristbands.component.html',
  styleUrl: './my-wristbands.component.css'
})
export class MyWristbandsComponent implements OnInit {
  hosts: Array<VenueHost> = [];

  constructor(private hostsApiService: HostsApiService) {
  }

  ngOnInit(): void {
    this.hostsApiService.getAll().subscribe((response: any) => {
      console.log(response);
      this.hosts = response;
    });
  }
}
