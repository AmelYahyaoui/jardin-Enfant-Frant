import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post.model';
import {environment} from '../../environments/environment';


@Injectable({providedIn: 'root'})
export class PostService {

  constructor(private http : HttpClient) {
  }


  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.api+ '/posts/listPosts');
  }

  savePost(post: any): Observable<Post> {
    return this.http.post<Post>(environment.api+ '/posts/addPost', post);
  }

  updatePost(post: any): Observable<Post> {
    return this.http.put<Post>(environment.api+ '/posts/updatePost', post);
  }
}
