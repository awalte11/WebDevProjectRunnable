import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient,  HttpParams, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

    uploadFile(url: string, file ) {


        return this.http.post(url, {
          name : "Test With Blob",
          picture : file
        })
        
        
    }

    blobifyFile(file : File) : string {
      var out;
      this.readFile(file, function(e) {
        out = e.target.result;
      })
      return out;
    }

    readFile(file : File, callback) {
      let reader = new FileReader();
      reader.onloadend = callback;
      reader.readAsBinaryString (file);
      
    }
    
}

