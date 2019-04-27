import { Injectable } from '@angular/core';
import { picture } from './picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  public pictures : picture[];

  constructor() { }

  getPicture(id: string): picture{
    let outPicture: picture;
      outPicture = this.pictures.find(picture => picture.id === id);

    return outPicture;
  }
}
