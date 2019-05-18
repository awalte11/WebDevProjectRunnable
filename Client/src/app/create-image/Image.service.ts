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
        formData.append(file.name, file, 'sponge');

        let params = new HttpParams();

        const options = {
        params: params,
        reportProgress: true,
        };

        const req = new HttpRequest('POST', url, formData, options);
        return this.http.request(req); 
    }
}

