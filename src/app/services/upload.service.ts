import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Post} from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.api}/uploadAttachement`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  load(filename): Observable<any> {
    return this.http.get<any>(environment.api+ '/loadAttachement/'+filename);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${environment.api}/files`);
  // }
}
