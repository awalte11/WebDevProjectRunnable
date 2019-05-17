import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-manage-collection',
  templateUrl: './manage-collection.component.html',
  styleUrls: ['./manage-collection.component.css']
})
export class ManageCollectionComponent implements OnInit {

  @Input() collection: Collection;
  newTags: string;
  killTags: string;
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  




  ngOnInit() {
    this.getCollection();
  }

  getCollection() : void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
        this.collection = this.dataService.getCollection(id);
        
    }
  }

  AddTags() : void  {
    var newTagsArr : string[];
    newTagsArr  = this.newTags.split(",");
  
    newTagsArr.forEach( s => {
      //this.dataService.addTagToCollection(this.collection, s)
     
      } 
    )

  }

  KillTagsParse() : void {
    var killList : string[];
    killList  = this.killTags.split(",");
    killList.forEach(s => {
      if (this.collection.tags.includes(s))
      {
        this.dataService.removeTagFromCollection(this.collection, s);
      }
    })
    
    

  }






}
