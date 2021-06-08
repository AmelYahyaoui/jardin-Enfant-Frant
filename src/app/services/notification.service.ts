import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/Post.model';
import {environment} from '../../environments/environment';
import {Notification} from '../models/Notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient) {
  }

  getAllNotifs(): Observable<Notification[]> {
    return this.http.get<Notification[]>(environment.api+ '/notifications/findAllNotif');
  }

  saveNotif(notif: Notification): Observable<Notification> {
    return this.http.post<Notification>(environment.api+ '/notifications/addNotif', notif);
  }

  updateNotif(notification: Notification,id: number): Observable<Notification> {
    return this.http.put<Notification>(environment.api+'/notifications/updateNotif/'+id,notification);
  }


  deleteNotif(notification: Notification,id: number): Observable<Notification> {
    return this.http.put<Notification>(environment.api+'/notifications/deleteNotif/'+id,notification);
  }

}
