import { Component, OnInit, Input } from '@angular/core';
import { tag } from '../tag';
import { Collection } from '../collection';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {


  @Input() collection: any;
  

  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  




  ngOnInit() {
    this.getCollection();
  }

  getCollection() : void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.collection = this.dataService.getCollection(id);
        
    }
  }

}
/*<div *ngFor = "let picture of collection.pictures">
  {{picture.name}}
  <app-image [picture]="picture" [details]=false></app-image>
</div>*/