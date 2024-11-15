import {Component, Input} from '@angular/core';
import {Profile} from "../../model/profile";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  @Input() profile: Profile = {} as Profile;
}
