import { Injectable } from '@angular/core';
import { Collection } from './collection';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public collections : Collection[];



  constructor() { 
    this.collections = [
      {
        id : "1",
        name : "Cats Booping",
        tags : [ 
          { name : "Cats" },
          { name : "Boops"},
          { name : "So much fluff"}
       ]
      },
      {
        id : "2",
        name : "Cats Sleeping",
        tags : [ 
          { name : "Cats" },
          { name : "Sleep Cute"},
          { name : "So much fluff"}
       ]
      }

    ]


  }

  getCollection(id: string): Collection{
    let outCollection: Collection;
      outCollection = this.collections.find(collection => collection.id === id);

    return outCollection;
  }
}
