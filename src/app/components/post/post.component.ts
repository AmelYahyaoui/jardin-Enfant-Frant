import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PostHeader} from 'src/app/models/PostHeader.model';
import {Post} from '../../models/Post.model';
import {PostComment} from '../../models/PostComment.model';
import {environment} from '../../../environments/environment';
import {UploadService} from '../../services/upload.service';
import {User} from '../../models/User.model';
import {PostService} from '../../services/post.service';
import {PostReaction} from '../../models/PostReaction.model';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/Notification.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  // styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @ViewChild('comment') comment: ElementRef;
  host = environment.api;

  showCommentsFlag: boolean;
  commentsList: any[];
  reactionsList: any[];
  showLoveReactionsFlag: boolean;
  showReactionsFlag: boolean;
  showLikeReactionsFlag: boolean;
  showDeslikeReactionsFlag: boolean;

  constructor(
    private uploadService: UploadService,
    private postService: PostService,
    private notificationService : NotificationService,
  ) {
    this.showCommentsFlag = false;
    this.showReactionsFlag = false;
    this.showLoveReactionsFlag = false;
    this.showLikeReactionsFlag = false;
    this.showDeslikeReactionsFlag = false;

    this.commentsList = [];
    this.reactionsList = []
  }


  ngOnInit(): void {
    console.log(this.post);
    this.commentsList = this.post.commentsList;
    this.reactionsList = this.post.reactionsList;
  }

  formatDate(dteStr: Date) {
    // console.log(dteStr)
    const dte = new Date(dteStr)
    // console.log(dte)
    const dteArray = dte.toString().split(' ');
    // console.log(dteArray)
    return `${dteArray[0]} ${dteArray[2]} ${dteArray[1]} ${dteArray[3]}, ${dteArray[4]}`;
  }

  getLength(list): number {
    return list.length
  }

  addComment() {
    const pCom = this.comment.nativeElement.value;
    if(pCom !== ''){

      const nComment = new PostComment();
      nComment.content = pCom;
      nComment.createdAt = new Date(Date.now());
      nComment.user = new User();
      nComment.user.id = 1;
      nComment.user.name = 'Amel YAHYAOUI';
      nComment.user.photo = 'photo';

      const newPost = new Post();
      newPost.id = this.post.id;
      newPost.commentsList = new Array<PostComment>();
      newPost.commentsList.push(nComment);
      newPost.editedAt = new Date(Date.now());
      console.log(newPost)

      this.postService.updatePost(newPost).subscribe(
        res => {
          console.log(res);
          this.commentsList.push(nComment);
          console.log(this.commentsList);
          this.addNotif('Comment');
        },
        error => {
          console.log('Erreur intern du systéme', '');
        });

      this.comment.nativeElement.value = '';
    }
  }

  addReaction(event) {
    const rType = event.target.parentElement.title;
    let isExist = false;
    for ( const pr of this.reactionsList){
      if(pr.content === rType && pr.user.id === 1){
        isExist = true;
        const nReactionList = this.reactionsList;
        console.log(nReactionList);
        nReactionList.splice(nReactionList.indexOf(pr),1);
        console.log(nReactionList);
        const newPost = new Post();
        newPost.id = this.post.id;
        newPost.reactionsList = new Array<PostReaction>();
        newPost.reactionsList = nReactionList;
        newPost.editedAt = new Date(Date.now());
        console.log(newPost)
        this.postService.updatePost(newPost).subscribe(
          res => {
            console.log(res);
            this.reactionsList = nReactionList;
            console.log(this.reactionsList);
            // this.addNotif(rType);
          },
          error => {
            console.log('Erreur intern du systéme', '');
          });
        break;
      }
    }
    if (isExist === false){
      const nReaction = new PostReaction();
      nReaction.content = rType;
      nReaction.user = new User();
      nReaction.user.id = 1;
      nReaction.user.name = 'Amel YAHYAOUI';
      nReaction.user.photo = 'photo';
      const newPost = new Post();
      newPost.id = this.post.id;
      newPost.reactionsList = new Array<PostReaction>();
      newPost.reactionsList.push(nReaction);
      newPost.editedAt = new Date(Date.now());
      console.log(newPost)
      this.postService.updatePost(newPost).subscribe(
        res => {
          console.log(res);
          this.reactionsList.push(nReaction);
          console.log(this.reactionsList);
          this.addNotif(rType);
        },
        error => {
          console.log('Erreur intern du systéme', '');
        });
    }
  }

  toggleComments(event) {
    event.preventDefault();
    this.showReactionsFlag = false;
    this.showLoveReactionsFlag = false;
    this.showLikeReactionsFlag = false;
    this.showDeslikeReactionsFlag = false;
    this.showCommentsFlag = !this.showCommentsFlag;
  }

  toggleReactions($event) {
    event.preventDefault();
    this.showCommentsFlag = false;
    this.showReactionsFlag = !this.showReactionsFlag;
    this.showLoveReactionsFlag = true;
    this.showLikeReactionsFlag = false;
    this.showDeslikeReactionsFlag = false;
  }

  showLoveReactions() {
    this.showLikeReactionsFlag = false;
    this.showDeslikeReactionsFlag = false;
    this.showLoveReactionsFlag = true;
  }

  showLikeReactions() {
    this.showLoveReactionsFlag = false;
    this.showDeslikeReactionsFlag = false;
    this.showLikeReactionsFlag = true;
  }

  showDeslikeReactions() {
    this.showLoveReactionsFlag = false;
    this.showLikeReactionsFlag = false;
    this.showDeslikeReactionsFlag = true;
  }

  private addNotif(objet: string) {
    console.log(objet);
    const nNotif = new Notification();
    nNotif.objetNotif = objet;
    nNotif.status = true;

    this.notificationService.saveNotif(nNotif).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log('Erreur intern du systéme', '');
      });
  }
}

// getImage(filename) {
//   // Make a call to Sprinf Boot to get the Image Bytes.
//   this.uploadService.load(filename).subscribe(
//     res => {
//       // this.retrieveResonse = res;
//       //
//       // this.base64Data = this.retrieveResonse.picByte;
//       //
//       // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
//       console.log('res: '+res);
//
//     }
//   );
// }
