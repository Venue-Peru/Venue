import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../model/profile";
import {BaseService} from "../../shared/services/base.service";
import {Post} from "../model/post";

@Injectable({
  providedIn: 'root'
})
export class PostsService extends BaseService<Post> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = "posts";
  }

  getById(id: number) {
    return this.http.get<Post>(`${this.basePath}${this.resourceEndpoint}/${id}`).pipe();
  }
}
