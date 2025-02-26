import {Component, OnInit} from '@angular/core';
import {Session} from "../../../sessions/model/session";
import {Router} from "@angular/router";
import {SessionsService} from "../../../sessions/services/sessions.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {CreateSessionRequest} from "../../model/create-session-request";
import {TokenService} from "../../../shared/services/token.service";

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent implements OnInit {
  session = new Session();
  segment = 0;
  backgroundImagePreview: string | ArrayBuffer | null = null;
  backgroundFile: File | null = null;
  choosenEditingStyle: string = 'forms';
  editingOptions: any[] = [
    { label: 'Edición Formulario', value: 'forms' },
    { label: 'Edición Vista Previa', value: 'preview' }
  ];

  constructor(
    private router: Router,
    private sessionService: SessionsService,
    private storage: AngularFireStorage,
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    this.session.location = 'N/A';
    let icon = sessionStorage.getItem('icon');
    icon != null ? this.session.hostImage = icon : this.session.hostImage = '';
  }

  onForward() {
    this.segment += 1;
    if (this.segment === 2) {
      this.createDialogSubmit();
    }
  }

  onBackward() {
    this.segment -= 1;
    if (this.segment < 0) {
      this.router.navigate(['/tickets-and-sessions/work/dashboard']);
    }
  }

  createDialogSubmit() {
    this.createSession();
  }

  createSession() {
    this.createSession_backend();
  }

  createSession_backend() {
    // uuid
    let uuid = this.tokenService.getUUIDFromToken(localStorage.getItem('token') || '') || '';

    // date
    // Parse the session.date and session.time strings into Date objects
    const date = new Date(this.session.date); // Convert the "Wed Nov 20..." string to a Date object
    const time = new Date(this.session.time); // Convert the "Fri Nov 29..." string to a Date object
    // Ensure the parsing worked
    if (isNaN(date.getTime()) || isNaN(time.getTime())) {
      console.error('Invalid date or time format');
      return;
    }
    // Extract the date part (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    // Extract the time part (HH:mm:ss) and ensure correct formatting
    const formattedTime = time.toTimeString().split(' ')[0];
    console.log('Formatted Date:', formattedDate); // Expected: "2024-11-20"
    console.log('Formatted Time:', formattedTime); // Expected: "22:00:00" or similar
    // Combine date and time into ISO 8601 format
    const combinedDateTime = new Date(`${formattedDate}T${formattedTime}`);
    // Validate the combined datetime
    if (isNaN(combinedDateTime.getTime())) {
      console.error('Invalid Combined DateTime');
      return;
    }
    const formattedDateTime = combinedDateTime.toISOString();
    console.log('Formatted DateTime:', formattedDateTime); // Expected: "2024-11-20T22:00:00.000Z"

    // send
    let createSessionRequest: CreateSessionRequest = new CreateSessionRequest(
      this.session.name,
      uuid,
      '',
      this.session.location,
      formattedDateTime,
      this.session.description,
      "-",
      "Casual",
      18,
      "Raggaeton"
    );
    this.sessionService.createSession(createSessionRequest).subscribe(
      (session: Session) => {
        let uuid = session.uuid;
        this.createSession_firebase(uuid);
      }
    );
  }

  createSession_firebase(uuid: string) {
    const token = localStorage.getItem('token');
    if (!token) return;
    //const uuid = this.tokenService.getUUIDFromToken(token);
    //if (!uuid) return;
    if (this.backgroundFile) {
      const backgroundFilePath = `sessions/${uuid}/background`;
      const backgroundFileRef = this.storage.ref(backgroundFilePath);
      const backgroundUploadTask = this.storage.upload(backgroundFilePath, this.backgroundFile);

      backgroundUploadTask.snapshotChanges().pipe(
        finalize(() => {
          backgroundFileRef.getDownloadURL().subscribe(url => {
            this.createSession_addBackgroundUrl(uuid, url);
          });
        })
      ).subscribe();
    }
  }

  createSession_addBackgroundUrl(uuid: string, url: string) {
    console.log('it got til here')
    this.sessionService.updateImage(uuid, url).subscribe(
      (session: Session) => {
        this.router.navigate(['/tickets-and-sessions/work/dashboard']);
      }
    )
  }

  createDialogCancel() {
    this.router.navigate(['/tickets-and-sessions/work/dashboard']);
  }

  onBackgroundFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.backgroundFile = file;
      const reader = new FileReader();
      reader.onload = (e) => this.session.sessionImage = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
