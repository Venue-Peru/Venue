import { Component } from '@angular/core';
import {VenueResponse} from "../../../_dtos/responses/venue-response";
import {VenuesService} from "../../../_services/venues.service";
import {CreateVenueRequest} from "../../../_dtos/requests/create-venue-request";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-create-venue',
  templateUrl: './create-venue.component.html',
  styleUrl: './create-venue.component.css'
})
export class CreateVenueComponent {
  newVenue: VenueResponse = new VenueResponse('','','');
  backgroundFile: File | null = null;

  constructor(private venuesService: VenuesService, private router: Router, private storage: AngularFireStorage, private tokenService: TokenService) {
  }

  onCancel() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard/my-venues']);
  }

  onSave() {
    if (this.newVenue.name == '') return;
    if (this.newVenue.location == '') return;
    if (this.newVenue.backgroundImage == '') return;
    this.saveImage();
  }

  saveImage() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) return;

    if (this.backgroundFile) {
      const backgroundFilePath = `venues/${uuid}/background`;
      const backgroundFileRef = this.storage.ref(backgroundFilePath);
      const backgroundUploadTask = this.storage.upload(backgroundFilePath, this.backgroundFile);

      backgroundUploadTask.snapshotChanges().pipe(
          finalize(() => {
            backgroundFileRef.getDownloadURL().subscribe(url => {
              this.saveBackend(url);
            });
          })
      ).subscribe();
    }
  }

  saveBackend(url: string) {
    let request = new CreateVenueRequest(
        this.newVenue.name,
        this.newVenue.location,
        url
    );
    this.venuesService.createVenue(request).subscribe(
        _ => {
          this.router.navigate(['/tickets-and-sessions/work/dashboard/my-venues']);
        }
    );
  }

  onBackgroundFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.backgroundFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.newVenue.backgroundImage = reader.result;
        }
      }
      reader.readAsDataURL(file);
    }
  }
}
