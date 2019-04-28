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
    this.collections = new Array<Collection>();
    this.tags = new Array<tag>();
    this.pictures = new Array<picture>();
    this.collections = JSON.parse(localStorage.getItem(this.collectionKey));
    this.tags = JSON.parse(localStorage.getItem(this.tagKey));
    this.tags.forEach(tag => {
      if (tag.collections === undefined)
      {
        tag.collections = []
      }
      if (tag.pictures === undefined)
      {
        tag.pictures = []
      }
    })
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
  //Collection
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
    newCollection = new Collection(name);
    newCollection.id = nextId;
    newCollection.tags = new Array<string>();
    tags.forEach(tagId => {
      if (this.tagExists(tagId))
      {
        this.addTagToCollection(newCollection, this.getTag(tagId))
      }
      else{
        this.addTagToCollection(newCollection, this.CreateTag(tagId))
      }
    });
    this.collections.push(newCollection);
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));
    localStorage.setItem(this.tagKey, JSON.stringify(this.tags));
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
    newPicture = new picture(name);
    newPicture.id = nextId;
    tags.forEach(tagId => {
      if (this.tagExists(tagId))
      {
        this.addTagToPicture(newPicture, this.getTag(tagId))
      }
      else{
        this.addTagToPicture(newPicture, this.CreateTag(tagId))
      }
    });
    this.pictures.push(newPicture);
    localStorage.setItem(this.pictureKey, JSON.stringify(this.pictures));
    localStorage.setItem(this.tagKey, JSON.stringify(this.tags));
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

  

  tagExists(id : string): Boolean
  {
    return !(this.tags.find(tag => tag.name === id) === undefined);

  }

  getTag(name: string): tag{
    let outTag: tag;
      outTag = this.tags.find(tag => tag.name === name);

    return outTag;
  }

  addTagToCollection(collection : Collection, tag : tag)
  {
    console.log(tag.name);
    collection.tags.push(tag.name);
    tag.collections.push(collection);

  }



  addTagToPicture(picture : picture, tag : tag)
  {
    picture.tags.push(tag.name);
    tag.pictures.push(picture);

  }


}
