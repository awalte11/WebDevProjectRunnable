import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Collection } from './collection';
import { tag } from './tag';
import { picture } from './picture';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const target = 'https://project-tester.herokuapp.com/';
const targetApi = target + 'api/';
@Injectable({
  providedIn: 'root'
})


export class DataService {
  //public collections : Collection[];
  //public tags : tag[];
  //public pictures : picture[];

  
  collectionKey = 'collections';
  tagKey = 'tags';
  pictureKey = 'pictures';
  testReset = false;

  constructor(private http : HttpClient) { 
    if (this.testReset)
    {
      //this.collections = new Array<Collection>();
      //this.pictures = new Array<picture>();
      //this.tags = new Array<tag>();
      //this.CreateCollection("Cats Sleeping", ["Cats", "Sleeping Animals", "So Much Fluff", "Cuteness"])
      //this.CreateCollection("Cats Stalking", ["Cats", "Hunting Animals", "So Much Fluff", "Cuteness"])
      //this.CreateCollection("Cats Booping", ["Cats", "Boops", "So Much Fluff", "Cuteness"])
      //this.CreatePicture("Cat vs Bird", ["Cats", "Birds", "Hunting Animals", "So Much Fluff", "Fur Vs Feathers"])
      //this.AddPictureToCollection(this.getCollection(2), this.getPicture(1))
    }
    else {
    //this.collections = JSON.parse(localStorage.getItem(this.collectionKey)) || new Array<Collection>();
    //this.tags = JSON.parse(localStorage.getItem(this.tagKey)) || new Array<tag>();
    //this.pictures = JSON.parse(localStorage.getItem(this.pictureKey)) || new Array<picture>();
    }
    
    
    




  }

  private extractData(res: Response) {
    let body = res;
    console.log("extract");
    console.log(body);
    return body || { };
  }

  //Get all X methods start here

  GetAllCollections() : Observable<any>
  {
    return this.http.get(targetApi + 'collections').pipe(map(this.extractData));
  }

  //this one does not currently return the actual images
  GetAllPictures() : Observable<any>
  {
    return this.http.get(targetApi + 'pictures').pipe(map(this.extractData));
  }

  GetAllTags() : Observable<any>
  {
    return this.http.get(targetApi + 'tags').pipe(map(this.extractData));
  }

  //Get one X methods start here

  getCollection(id: string): Observable<any>{
    console.log(id);
    return this.http.get(targetApi + 'collections/' + id).pipe(map(this.extractData));;

  }

  getPicture(id: string): Observable<any>{
    console.log(id);
    return this.http.get(targetApi + 'pictures/' + id).pipe(map(this.extractData));
  }

  //get one tag does not exist. Client side has zero need for knowledge of tags as mongo-db objects rather than as strings.

  //Get all X matching programmed criteria starts here.
  getTaggedPictures(tag : string ): Observable<any>{
    return this.http.get(targetApi + 'picturesbytag/' + tag).pipe(map(this.extractData));
  }

  getTaggedCollections (tag : string ): Observable<any>{
    return this.http.get(targetApi + 'collectionsbytag/' + tag).pipe(map(this.extractData));
  }

  //Update methods start here

  
    /**
   * Master modify picture option, editing all things editable
   * @param id 
   * @param name 
   * @param comment 
   * @param addTags 
   * @param removeTags 
   */
  ModifyPicture(id : string, name : string, comment : string, addTags : string [], removeTags : string[]) : Observable<any>{
    
    var body = {
      name : name,
      comment : comment,
      addTags : addTags,
      removeTags : removeTags
    }
    
    return this.http.put(targetApi + 'pictures/' + id, body);
  }

  //For when you just want to make one change
  renamePicture(picture : string, name : string)
  {
    return this.ModifyPicture(picture, name, null, null, null)
  }

  reCommentPicture(picture : string, comment : string)
  {
    return this.ModifyPicture(picture, null, comment, null, null)
  }

  /**
   * Add tags
   * @param picture Picture ID 
   * @param tags tags as string array. To pass a single tag easily, wrap it in []
   */
  addTagsToPicture(picture : string, tags : string[])
  {
    return this.ModifyPicture(picture, name, null, tags, null)
  }

  /**
   * Remove tags
   * @param picture Picture ID 
   * @param tags tags as string array. To pass a single tag easily, wrap it in []
   */
  removeTagsFromPicture(picture : string, tags : string[])
  {
    return this.ModifyPicture(picture, null, null, null, tags)
  }


  /**
   * Master modify collection option, editing all things editable
   * @param id 
   * @param name 
   * @param comment 
   * @param addPictures 
   * @param removePictures 
   * @param addTags 
   * @param removeTags 
   */
  ModifyCollection(id : string, name : string, comment : string, addPictures : string[], removePictures : string[], addTags : string [], removeTags : string[]) : Observable<any>{
    
    var body = {
      name : name,
      comment : comment,
      addPictures : addPictures,
      removePictures : removePictures,
      addTags : addTags,
      removeTags : removeTags
    }
    
    return this.http.put(targetApi + 'collections/' + id, body);
  }

  //For when you just want to make one change
  renameCollection(collection : string, name : string)
  {
    return this.ModifyCollection(collection, name, null, null, null, null, null)
  }

  reCommentCollection(collection : string, comment : string)
  {
    return this.ModifyCollection(collection, null, comment, null, null, null, null)
  }
  
  /**
   * Add pictures to collection
   * @param collection Collection ID
   * @param picture Picture IDs as string array. To pass one easily, just wrap it in []
   */
  addPicturesToCollection(collection : string, picture : string[])
  {
    return this.ModifyCollection(collection, null, null, picture, null, null, null)
  }

  /**
   * Remove pictures from collection
   * @param collection Collection ID
   * @param picture Picture IDs as string array. To pass one easily, just wrap it in []
   */
  removePicturesFromCollection(collection : string, picture : string[])
  {
    return this.ModifyCollection(collection, null, null, null, picture, null, null)
  }

  /**
   * Add tags
   * @param picture Collection ID 
   * @param tags tags as string array. To pass a single tag easily, wrap it in []
   */
  addTagsToCollection(collection : string, tags : string[])
  {
    return this.ModifyCollection(collection, null, null, null, null, tags, null)
  }
  /**
   * Remove tags
   * @param picture Collection ID 
   * @param tags tags as string array. To pass a single tag easily, wrap it in []
   */
  removeTagsFromCollection(collection : string, tags : string[])
  {
    return this.ModifyCollection(collection, null, null, null, null, null, tags)
  }

  //Deletes start here

  /**
   * Delete a collection. Don't worry about the details, the server handles that
   * @param id the ID
   */
  DeleteCollection(id: string): void {
    this.http.delete(targetApi + 'collections/' + id);
  }

    /**
   * Delete a picture. Don't worry about the details, the server handles that
   * @param id the ID
   */
  DeletePicture(id: string): void {
    this.http.delete(targetApi + 'pictures/' + id);
  }

  //DeleteTag is deliberately not a thing here.

  

  //Create starts here
  CreateCollection(name : string,  comment : string, tags : string[], pictures: string[])
  {
    this.http.post(targetApi + 'collections/', {
      name : name,
      comment : comment,
      tags : tags,
      pictures : pictures
    })

  }

  createPicture(file, name : string,  comment : string, tags : string[]) {

    
    return this.http.post(targetApi + 'pictures/', {
      name : name,
      picture : file,
      comments : comment,
      tags : tags

    });

    
    
}





  







}
