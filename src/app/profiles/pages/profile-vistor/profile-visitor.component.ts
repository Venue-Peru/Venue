import {Component, OnInit} from '@angular/core';
import {Profile} from "../../model/profile";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfilesService} from "../../services/profiles.service";
import {Post} from "../../model/post";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-profile-vistor',
  templateUrl: './profile-visitor.component.html',
  styleUrl: './profile-visitor.component.css'
})
export class ProfileVisitorComponent implements OnInit {
  start: boolean | null = false;
  profile: Profile = {} as Profile;
  posts: Array<Post> = [];

  ngOnInit(): void {
    this.profilesService.getById(1).subscribe(
      profile => {
        this.start = true;
        this.profile = profile;
      },
      error => {
        this.start = null;
      }
      )
    this.postsService.getAll().subscribe(posts => {
        this.posts = posts;
        console.log(this.posts);
    })
  }

  constructor(
    private profilesService: ProfilesService,
    private postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

}
