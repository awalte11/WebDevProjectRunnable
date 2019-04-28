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
  testReset = false;

  constructor() { 
    if (this.testReset)
    {
      this.collections = new Array<Collection>();
      this.pictures = new Array<picture>();
      this.tags = new Array<tag>();
      this.CreateCollection("Cats Sleeping", ["Cats", "Sleeping Animals", "So Much Fluff", "Cuteness"])
      this.CreateCollection("Cats Stalking", ["Cats", "Hunting Animals", "So Much Fluff", "Cuteness"])
      this.CreateCollection("Cats Booping", ["Cats", "Boops", "So Much Fluff", "Cuteness"])
      this.CreatePicture("Cat vs Bird", ["Cats", "Birds", "Hunting Animals", "So Much Fluff", "Fur Vs Feathers"])
      this.AddPictureToCollection(this.getCollection(2), this.getPicture(1))
    }
    else {
    this.collections = JSON.parse(localStorage.getItem(this.collectionKey)) || new Array<Collection>();
    this.tags = JSON.parse(localStorage.getItem(this.tagKey)) || new Array<tag>();
    this.pictures = JSON.parse(localStorage.getItem(this.pictureKey)) || new Array<picture>();
    }
    
    
    




  }

  AddPictureToCollection(collection : Collection, picture : picture)
  {
    collection.pictures.push(picture);
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));
  }

  removePictureFromCollection(collection : Collection, picture : picture)
  {
    const idToNuke = collection.pictures.findIndex(pict => pict.id == picture.id);
    collection.pictures[idToNuke] = null;
    collection.pictures = collection.pictures.filter(function(item) {return item != null});
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));
  }


  //This code is all shamelessly borrowed from my assignment 5. so that when I merge that I know how to merge this too
  //Collection
  CreateCollection(name : string, tags : string[])
  {
    let nextId: number;
    nextId = 1;
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

  DeleteCollection(id: number): void {
    const idToNuke = this.collections.findIndex(collection => collection.id === id);
    this.collections[idToNuke].tags.forEach(tagToKill => {
      this.removeTagFromCollection(this.collections[idToNuke], tagToKill)

    })
    this.collections[idToNuke] = null;
    this.collections = this.collections.filter(function(item) {return item != null});
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));
  }

  removeTagFromCollection(collection : Collection, tag : string)
  {
    const toKill = collection.tags.findIndex(tagInColl => tagInColl == tag);
    collection.tags[toKill] = null;
    collection.tags = collection.tags.filter(function(item) {return item != null});
    const tagToEdit = this.getTag(tag)
    const toKill2 = tagToEdit.collections.findIndex(col => col.id == collection.id)
    tagToEdit.collections[toKill2] = null;
    tagToEdit.collections = tagToEdit.collections.filter(function(item) {return item != null});
    localStorage.setItem(this.collectionKey, JSON.stringify(this.collections));
    localStorage.setItem(this.tagKey, JSON.stringify(this.tags));
    
  }

  



  CreatePicture(name : string, tags : string[])
  {
    let nextId: number;
    nextId = 1;
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

  DeletePicture(id: number): void {
    const idToNuke = this.pictures.findIndex(picture => picture.id === id);
    this.pictures[idToNuke].tags.forEach(tagToKill => {
      this.removeTagFromPicture(this.pictures[idToNuke], tagToKill)

    })
    this.pictures[idToNuke] = null;
    this.pictures = this.pictures.filter(function(item) {return item != null});
    localStorage.setItem(this.pictureKey, JSON.stringify(this.pictures));
  }

  removeTagFromPicture(picture : picture, tag : string)
  {
    const toKill = picture.tags.findIndex(tagInPict => tagInPict == tag);
    picture.tags[toKill] = null;
    picture.tags = picture.tags.filter(function(item) {return item != null});
    const tagToEdit = this.getTag(tag)
    const toKill2 = tagToEdit.pictures.findIndex(pict => pict.id == picture.id)
    tagToEdit.pictures[toKill2] = null;
    tagToEdit.pictures = tagToEdit.pictures.filter(function(item) {return item != null});
    localStorage.setItem(this.pictureKey, JSON.stringify(this.pictures));
    localStorage.setItem(this.tagKey, JSON.stringify(this.tags));
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
      outTag = this.tags.find(tag => tag.name == name);

    return outTag;
  }

  addTagToCollection(collection : Collection, tag : tag)
  {
    collection.tags.push(tag.name);
    tag.collections.push(collection);

  }



  addTagToPicture(picture : picture, tag : tag)
  {
    picture.tags.push(tag.name);
    tag.pictures.push(picture);

  }


}
