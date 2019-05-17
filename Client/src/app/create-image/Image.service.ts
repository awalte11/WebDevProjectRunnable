import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
/*
  public uploadFile(fileToUpload: File) {
  const _formData = new FormData();
  _formData.append('file', fileToUpload, fileToUpload.name);
  return<any> _formData;
  }*/
}
