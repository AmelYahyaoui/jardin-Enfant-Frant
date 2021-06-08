import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PostComment} from '../../models/PostComment.model';
import {User} from '../../models/User.model';
import {Post} from '../../models/Post.model';
import {Feedback} from '../../models/Feedback.model';
import {FeedbackService} from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('feedObj') feedObj: ElementRef;
  @ViewChild('feedCont') feedCont: ElementRef;



  constructor(private router: Router, private toastr: ToastrService, private feedbackService :FeedbackService) { }

  ngOnInit(): void {
  }

  submitFeedback() {
    console.log(this.feedObj.nativeElement.value);
    const fObj = this.feedObj.nativeElement.value;
    const fCont = this.feedCont.nativeElement.value
    if ( fObj==='' ||  fCont === '' ){
      this.toastr.warning('The feedback object and content all are required', '');
    } else {
      const nFeed = new Feedback();
      nFeed.object = fObj;
      nFeed.body = fCont;

      this.feedbackService.saveFeed(nFeed).subscribe(
        res => {
          console.log(res);
          this.toastr.success('Your feedback was submitted successfully to the admins :)', '');
          this.router.navigate(['posts']);
        },
        error => {
          console.log('Erreur intern du systéme', '');
        });
    }


  }
}
