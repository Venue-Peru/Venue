import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Profile} from "../../model/profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfilesService} from "../../services/profiles.service";
import {Post} from "../../model/post";
import {PostsService} from "../../services/posts.service";
import {TokenService} from "../../../shared/services/token.service";
import {InputTextarea} from "primeng/inputtextarea";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {EditProfileFieldsRequest} from "../../model/edit-profile-fields-request";

@Component({
  selector: 'app-profile-vistor',
  templateUrl: './profile-visitor.component.html',
  styleUrl: './profile-visitor.component.css'
})
export class ProfileVisitorComponent implements OnInit {
  @Input() profileUuid: string = '';
  @Input() loadProfile: boolean = false;
  profile: Profile = {} as Profile;
  editDialogVisible_fields: boolean = false;
  editDialogVisible_icon: boolean = false;
  editDialogVisible_background: boolean = false;
  isThisUser: boolean = false;
  start: boolean | null = false;
  posts: Array<Post> = [];

  constructor(
    private profilesService: ProfilesService,
    private postsService: PostsService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    if (this.loadProfile) {
      if (this.profileUuid) {
        this.profilesService.getByUUIDWithString(this.profileUuid).subscribe(
          profile => {
            this.start = true;
            this.profile = profile;
          },
          error => {
            this.start = null;
          }
        )
      }
    }
    else {
      this.route.params.subscribe(params => {
        if (params['eventId']) {
          this.profilesService.getByUUID(params['eventId']).subscribe(
            profile => {
              this.start = true;
              this.profile = profile;
            },
            error => {
              this.start = null;
            }
          )
        } else {
          this.start = null;
        }
      })
    }
    this.checkIfThisUser();
  }



  checkIfThisUser() {
    this.route.params.subscribe(params => {
      let token = localStorage.getItem('token');
      if (params['eventId'] && token) {
        if (this.tokenService.getUUIDFromToken(token) == params['eventId']) {
          this.isThisUser = true;
        }
      }
    })
  }

  openEditDialog() {
    this.editDialogVisible_fields = true;
  }

  onSave_fields(updatedProfile: Profile) {
    this.editFields(updatedProfile);
    this.editDialogVisible_fields = false;
  }

  editFields(updatedProfile: Profile) {
    // get uuid safely
    let token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    let uuid = this.tokenService.getUUIDFromToken(token);
    if (!uuid) {
      return;
    }
    // change birthDate to string yyyy-mm-dd
    let date = updatedProfile.birthDate.toString();
    // if date is in yyyy-mm-dd format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      date = this.formatDateToString(updatedProfile.birthDate);
    }
    // get profile fields
    let editProfileFieldsRequest = new EditProfileFieldsRequest(
      updatedProfile.bio ? updatedProfile.bio : '',
      date
    );
    this.profilesService.updateFields(uuid, editProfileFieldsRequest).subscribe(
      profile => {
        this.profile = profile;
      }
    );
  }

  onCancel_fields() {
    this.editDialogVisible_fields = false;
  }

  onSave_icon(newIcon: File) {
    this.editIcon(newIcon);
    this.editDialogVisible_icon = false;
  }

  onCancel_icon() {
    this.editDialogVisible_icon = false;
  }

  onSave_background(newBackground: File) {
    this.editBackground(newBackground);
    this.editDialogVisible_background = false;
  }

  onCancel_background() {
    this.editDialogVisible_background = false;
  }

  onClickingIcon() {
    if (this.isThisUser) {
      this.editDialogVisible_icon = true;
    }
  }

  onClickingBackground() {
    if (this.isThisUser) {
      this.editDialogVisible_background = true;
    }
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
    const filePath = `profiles/${uuid}/background`;
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
    const filePath = `profiles/${uuid}/icon`;
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

  updateBackground_backend(uuid: String, background: String) {
    this.profilesService.updateBackground(uuid, background).subscribe(
      profile => {
        this.profile = profile;
      }
    )
  }

  updateIcon_backend(uuid: String, icon: String) {
    this.profilesService.updateIcon(uuid, icon).subscribe(
      profile => {
        this.profile = profile;
      }
    )
  }

  getAge(): number {
    let currentYear = new Date().getFullYear();
    let birthYear = new Date(this.profile.birthDate).getFullYear();
    return currentYear - birthYear;
  }

  // resources

  formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
