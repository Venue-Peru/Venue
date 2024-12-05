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
    this.profile = updatedProfile;
    this.editDialogVisible_fields = false;
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


}
