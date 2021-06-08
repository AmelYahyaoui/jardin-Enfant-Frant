import { Component, OnInit } from "@angular/core";
import {Post} from '../../models/Post.model';
import {ToastrService} from 'ngx-toastr';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  postsList: Post[];

  constructor(private toastr: ToastrService,
              private postService:PostService) {}

  ngOnInit(): void {
    this.postsList = [];
    this.getListPosts();
  }

  public getListPosts(): void {
    console.log(this.postsList);
    this.postService.getAllPosts().subscribe(
      response => {
        for( const r of response){
          if (r.user.id === 1){
            this.postsList.push(r);
          }
        }
        console.log(this.postsList);
      },
      error => {
        this.toastr.error('Erreur interne du systéme', '');
      }
    )
  }
}
