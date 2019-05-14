import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient,  HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

    uploadFile(url: string, file: File): Observable<HttpEvent<any>> {

        let formData = new FormData();
        formData.append('upload', file);

        let params = new HttpParams();

        const options = {
        params: params,
        reportProgress: true,
        };

        const req = new HttpRequest('POST', url, formData, options);
        return this.http.request(req); 
    }
}

/*
public uploadFile(fileToUpload: File) {
  const _formData = new FormData();
  _formData.append('file', fileToUpload, fileToUpload.name);
  return <any> _formData;
}

public fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    this.uploadFile(fileSelected)
    .subscribe( (response) => {
       console.log('set any success actions...');
       return response;
     },
      (error) => {
        console.log('set any error actions...');
      });
    }
*/
