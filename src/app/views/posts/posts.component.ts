import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Post} from '../../models/Post.model';
import {PostService} from '../../services/post.service';
import {createPopper} from '@popperjs/core';
import {UploadService} from '../../services/upload.service';
import {of} from 'rxjs';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsList: Post[];

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef;

  constructor(private toastr: ToastrService,
              private postService:PostService,) {}

  public ngOnInit() {
    this.getListPosts();
    console.log('posts compo')
  }

  public getListPosts(): void {
    this.postService.getAllPosts().subscribe(
      response => {
        this.postsList = response;
        console.log(this.postsList);
      },
      error => {
        this.toastr.error('Erreur interne du systéme', '');
      }
    )
  }

 toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }


}
