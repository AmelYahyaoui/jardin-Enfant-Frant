import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {element} from 'protractor';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


import {PostService} from '../../services/post.service';
import {PostHeader} from '../../models/PostHeader.model';
import {PostBody} from '../../models/PostBody.model';
import {User} from '../../models/User.model';
import {PostAttachement} from '../../models/PostAttachement.model';
import {Post} from '../../models/Post.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.css']
})


export class AddEditPostComponent implements OnInit {

  @ViewChild('postSubject') postSubject: ElementRef;
  @ViewChild('postCategory') postCategory: ElementRef;
  @ViewChild('postBody') postBody: ElementRef;
  @ViewChild('postImgAtt') postImgAtt: ElementRef;
  @ViewChild('postVidAtt') postVidAtt: ElementRef;
  @ViewChild('postFileAtt') postFileAtt: ElementRef;

  showFormAddEditPost: boolean;
  private fileName: string;
  private imgAttachement: PostAttachement;
  private vidAttachement: PostAttachement;
  private fileAttachement: PostAttachement;
  private postAttachements: PostAttachement[];

  constructor(
    private toastr: ToastrService,
    private postService: PostService,
    private router: Router,
    private uploadService: UploadService,
  ) {

  };


  ngOnInit(): void {
    this.showFormAddEditPost = true;
    this.fileName = '';
    this.imgAttachement = null;
    this.vidAttachement = null;
    this.fileAttachement = null;
    this.postAttachements = [];
  }

  showForm() {
    this.showFormAddEditPost = false;
  }

  hideForm() {
    this.showFormAddEditPost = true;
    console.log('hide form')
  }

  // toBase64 = file => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // });
  //
  // async getBase64(event) {
  //   console.log('to base64');
  //   const file = event.target.files[0];
  //   this.fType = 'image';
  //   this.fContent = '' + await this.toBase64(file);
  //   this.fExtention = 'png';
  //   //
  //   // console.log(typeof fContent);
  //   // console.log(fContent);
  //   // this.imgAttachement = new PostAttachement();
  //   // this.imgAttachement.content = fContent;
  //   // this.imgAttachement.type = fType;
  //   // this.imgAttachement.extention = fExtention;
  //   // switch (event.target.a)
  // }

  addFileName(event) {
    // console.log('change file name');
    if (event.target.files.length > 0) {
      event.target.previousSibling.innerHTML = event.target.files[0].name;
    }
  }

  uploadFile(event) {
    this.addFileName(event);

    let progress = 0;
    let message = '';
    let currentFile : File = event.target.files.item(0);

    this.uploadService.upload(currentFile).subscribe(
      response => {
        if (response.type === HttpEventType.UploadProgress) {
          progress = Math.round(100 * response.loaded / response.total);
        } else if (response instanceof HttpResponse) {
          // tslint:disable-next-line:no-shadowed-variable
          const newAtt = new PostAttachement();
          newAtt.name = currentFile.name;
          newAtt.type = event.target.accept;
          console.log(newAtt);
          this.postAttachements.push(newAtt);
          console.log(this.postAttachements);
          console.log('response: '+response);
        }
      },
      err => {
        progress = 0;
        message = 'Could not upload the file!';
        currentFile = undefined;
      });
    const newAtt = new PostAttachement();
    newAtt.name = currentFile.name;
    newAtt.type = event.target.accept;
    console.log(newAtt);
    this.postAttachements.push(newAtt);
    console.log(this.postAttachements);
    // console.log('message: '+message);
  }

  onSave(event) {
    const pSub = this.postSubject.nativeElement.value;
    const pCat = this.postCategory.nativeElement.value;
    const pBody = this.postBody.nativeElement.value;
    console.log(pSub);
    console.log(pCat);
    console.log(pBody);

    if (pSub === '' || pCat === '' || pBody === '') {
      this.toastr.warning('Post subject, post category and post body all are required ', '');
    } else {
      let postsList = [];
      let subjectUsed = false;
      this.postService.getAllPosts().subscribe(
        response => {
          postsList = response;
          let p: Post;
          for (p of postsList) {
            if (p.postHeader.subject === pSub) {
              subjectUsed = true;
              break;
            }
          }
          if (subjectUsed === true) {
            this.toastr.warning('Post subject already in use', '');
          } else {
            // const newPost = new Post();
            // newPost.createdAt = new Date(Date.now());
            // newPost.editedAt = null;
            // newPost.deletedAt = null;
            // newPost.postHeader= new PostHeader();
            // newPost.postHeader.subject = pSub;
            // newPost.postHeader.category = pCat;
            // newPost.postBody = new PostBody();
            // newPost.postBody.content = pBody;
            // newPost.user = new User(1, 'name', 'photo');



            const newPost = {
              createdAt: Date.now(),
              editedAt: null,
              deletedAt: null,
              postHeader: {
                subject: pSub,
                category: pCat
              },
              postBody: {
                content: pBody
              },
              attachementsList: this.postAttachements,
              user: {
                id: 1,
                name: 'Amel Yahyaoui',
                photo: 'photo'
              }
            }

            console.log(newPost)
            this.postService.savePost(newPost).subscribe(
              res => {
                console.log(res);
                console.log(this.postAttachements);
                this.toastr.success('Successfully added post', '');
              },
              error => {
                this.toastr.error('Erreur intern du systéme', '');
              });
            this.hideForm();
            console.log('ajout avec succés');
            window.location.reload();
          }
        },
        error => {
          this.toastr.error('Erreur interne du systéme', '');
        }
      )
    }
  }



}
