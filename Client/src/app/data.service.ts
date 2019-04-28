import { Injectable } from '@angular/core';
import { Collection } from './collection';
import { tag } from './tag';
import { picture } from './picture';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public collections : Collection[];
  public tags : tag[];
  public pictures : picture[];

  collectionKey = 'collections';
  tagKey = 'tags';
  pictureKey = 'pictures';


  constructor() { 
    this.collections = JSON.parse(localStorage.getItem(this.collectionKey));
    this.tags = JSON.parse(localStorage.getItem(this.tagKey));
    this.collections = JSON.parse(localStorage.getItem(this.pictureKey));
    if (this.collections === null)
    {
      this.collections = new Array<Collection>();
    }
    if (this.tags === null)
    {
      this.tags = new Array<tag>();
    }
    if (this.pictures === null)
    {
      this.pictures = new Array<picture>();
    }
    if (this.collections.length <=1 )
    {
    this.CreateCollection("Cats Booping", ["Cats", "Boops", "So much fluff"]);
    this.CreateCollection("Cats Sleeping", ["Cats", "Sleep Cute", "So much fluff"]);
    }




  }
  //This code is all shamelessly borrowed from my assignment 5. so that when I merge that I know how to merge this too
  CreateCollection(name : string, tags : string[])
  {
    let nextId: number;
    nextId = 0;
    this.collections.forEach(collection => {
        if (collection && collection.id >= nextId) {
            nextId = collection.id + 1;
        }
    });
    let newCollection : Collection;
    newCollection = new Collection();
    newCollection.name = name;
    newCollection.id = nextId;
    newCollection.tags = new Array<tag>();
    tags.forEach(tagId => {
      if (this.checkForTag(tagId))
      {
        newCollection.tags.push(this.getTag(tagId))
      }
      else{
        newCollection.tags.push(this.CreateTag(tagId))
      }
    });
    this.collections.push(newCollection);
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));

  }

  getCollection(id: number): Collection{
    let outCollection: Collection;
      outCollection = this.collections.find(collection => collection.id === id);

    return outCollection;
  }

  CreatePicture(name : string, tags : string[])
  {
    let nextId: number;
    nextId = 0;
    this.pictures.forEach(picture => {
        if (picture && picture.id >= nextId) {
            nextId = picture.id + 1;
        }
    });
    let newPicture : picture;
    newPicture = new picture();
    newPicture.name = name;
    newPicture.id = nextId;
    tags.forEach(tagId => {
      if (this.checkForTag(tagId))
      {
        newPicture.tags.push(this.getTag(tagId))
      }
      else{
        newPicture.tags.push(this.CreateTag(tagId))
      }
    });
    this.pictures.push(newPicture);
    localStorage.setItem(this.pictureKey, JSON.stringify(this.pictures));
  }

  getPicture(id: number): picture{
    let outPicture: picture;
      outPicture = this.pictures.find(pictures => pictures.id === id);

    return outPicture;
  }
  CreateTag(name : string) : tag{
    let newTag : tag;
    newTag = new tag();
    newTag.name = name;
    this.tags.push(newTag);
    localStorage.setItem(this.tagKey, JSON.stringify(this.tags));
    return newTag;
  }

  checkForTag(id : string): Boolean
  {
    return !(this.tags.find(tag => tag.name === id) === undefined);

  }

  getTag(name: string): tag{
    let outTag: tag;
      outTag = this.tags.find(tag => tag.name === name);

    return outTag;
  }




}
