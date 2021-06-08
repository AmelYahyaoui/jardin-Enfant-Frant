import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/Notification.model';
import {environment} from '../../environments/environment';
import {Feedback} from '../models/Feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http : HttpClient) {
  }

  saveFeed(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(environment.api+ '/feedbacks/addFeed', feedback);
  }
}
