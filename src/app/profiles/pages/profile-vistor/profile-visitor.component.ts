import {Component, OnInit, ViewChild} from '@angular/core';
import {Profile} from "../../model/profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfilesService} from "../../services/profiles.service";
import {Post} from "../../model/post";
import {PostsService} from "../../services/posts.service";
import {TokenService} from "../../../shared/services/token.service";
import {InputTextarea} from "primeng/inputtextarea";

@Component({
  selector: 'app-profile-vistor',
  templateUrl: './profile-visitor.component.html',
  styleUrl: './profile-visitor.component.css'
})
export class ProfileVisitorComponent implements OnInit {
  start: boolean | null = false;
  profile: Profile = {} as Profile;
  posts: Array<Post> = [];
  isThisUser: boolean = false;
  // Edit dialog
  editDialogVisible: boolean = false;
  editDialogData: Profile = {} as Profile;

  ngOnInit(): void {
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
    this.checkIfThisUser();
    /*
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts);
    })
     */
  }

  constructor(
    private profilesService: ProfilesService,
    private postsService: PostsService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
    this.editDialogVisible = true;
    // create a copy of the profile to avoid changing the original data
    this.editDialogData = JSON.parse(JSON.stringify(this.profile));
  }

  editDialogSubmit() {
  }

  editDialogCancel() {
    this.editDialogVisible = false;
  }
}
