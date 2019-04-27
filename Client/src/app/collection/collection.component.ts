import { Component, OnInit, Input } from '@angular/core';
import { tag } from '../tag';
import { Collection } from '../collection';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {


  @Input() collection: Collection;

  constructor( private route : ActivatedRoute, private router : Router , private collectionService: CollectionService) { }

  




  ngOnInit() {
    this.getCollection();
  }

  getCollection() : void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.collection = this.collectionService.getCollection(id);
        
    }
  }

}
