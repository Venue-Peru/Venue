import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostService } from '../../services/host.service';
import { Host } from '../../model/host';
import {TokenService} from "../../../shared/services/token.service";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {EditHostFieldsRequest} from "../../model/edit-host-fields-request";
import {Session} from "../../../sessions/model/session";
import {SessionsService} from "../../../sessions/services/sessions.service";
@Component({
  selector: 'app-host-visitor',
  templateUrl: './host-visitor.component.html',
  styleUrl: './host-visitor.component.css'
})
export class HostVisitorComponent implements OnInit {
  start: boolean | null = false;
  host: Host = {} as Host;
  sessions: Session[] | null = null;
  isThisUser: boolean = false;
  editDialogVisible_fields: boolean = false;
  editDialogVisible_icon: boolean = false;
  editDialogVisible_background: boolean = false;

  // layer 0

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionsService,
    private hostService: HostService,
    private tokenService: TokenService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['hostId']) {
        this.hostService.getByUUID(params['hostId']).subscribe(
          host => {
            this.start = true;
            this.host = host;
          },
          () => {
            this.start = null;
          }
        );
      } else {
        this.start = null;
      }
    });
    this.checkIfThisUser();
    // get uuid
    let uuid = this.tokenService.getUUIDFromToken(localStorage.getItem('token') || '') || '';
    this.sessionService.getAllByHostUuid(uuid).subscribe(sessions => {
      this.sessions = sessions;
      console.log(sessions);
    });
  }

  // layer 1

  onClickingIcon(): void {
    this.editDialogVisible_icon = true;
  }

  onClickingBackground(): void {
    this.editDialogVisible_background = true;
  }

  onSave_fields(updatedHost: Host): void {
    this.editFields(updatedHost);
    this.editDialogVisible_fields = false;
  }

  onCancel_fields(): void {
    this.editDialogVisible_fields = false;
  }

  onSave_icon(newIcon: File): void {
    this.editIcon(newIcon);
    this.editDialogVisible_icon = false;
  }

  onCancel_icon(): void {
    this.editDialogVisible_icon = false;
  }

  onSave_background(newBackground: File): void {
    this.editBackground(newBackground);
    this.editDialogVisible_background = false;
  }

  onCancel_background(): void {
    this.editDialogVisible_background = false;
  }

  onClickingEditIcon(): void {
    this.editDialogVisible_fields = true;
  }

  // layer 2

  checkIfThisUser() {
    this.route.params.subscribe(params => {
      let token = localStorage.getItem('token');
      if (params['hostId'] && token) {
        if (this.tokenService.getUUIDFromToken(token) == params['hostId']) {
          this.isThisUser = true;
        }
      }
    })
  }

  // layer 3

  editFields(updatedHost: Host) {
    // get uuid safely
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) {
      return;
    }
    // get profile fields
    let editHostFieldsRequest = new EditHostFieldsRequest(
      updatedHost.name,
      updatedHost.bio ? updatedHost.bio : ''
    );
    this.hostService.updateFields(uuid, editHostFieldsRequest).subscribe(
      host => {
        this.host = host;
      }
    );
  }

  editBackground(newBackground: File) {
    // get uuid safely
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) {
      return;
    }
    // send to firebase
    const filePath = `hosts/${uuid}/background`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, newBackground);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          console.log('xd');
          this.updateBackground_backend(uuid ? uuid : '', url);
        });
      })
    ).subscribe();
  }

  editIcon(newIcon: File) {
    // get uuid safely
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) {
      return;
    }
    const filePath = `hosts/${uuid}/icon`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, newIcon);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          console.log('xd');
          this.updateIcon_backend(uuid ? uuid : '', url);
        });
      })
    ).subscribe();
  }

  // layer 4

  updateBackground_backend(uuid: String, background: String) {
    this.hostService.updateBackground(uuid, background).subscribe(
      host => {
        console.log('did it');
        this.host = host;
      }
    )
  }

  updateIcon_backend(uuid: String, icon: String) {
    this.hostService.updateIcon(uuid, icon).subscribe(
      host => {
        console.log('did it');
        this.host = host;
      }
    )
  }

  isSessionsLoading() {
    return this.sessions == null;
  }

  areThereSessions() {
    return (this.sessions != null && this.sessions.length > 0);
  }

}
