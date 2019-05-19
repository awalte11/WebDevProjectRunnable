import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { picture } from '../picture';

@Component({
  selector: 'app-manage-image',
  templateUrl: './manage-image.component.html',
  styleUrls: ['./manage-image.component.css']
})
export class ManageImageComponent implements OnInit {

  @Input() picture: picture;
  newTags: string;
  killTags: string;
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  




  ngOnInit() {
    //this.getPicture();
  }
/*
  getPicture() : void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
        this.picture = this.dataService.getPicture(id);
        
    }
  }

  AddTags() : void  {
    var newTagsArr : string[];
    newTagsArr  = this.newTags.split(",");
  
    newTagsArr.forEach( s => {
      //this.dataService.addTagToPicture(this.picture, s)
     
      } 
    )

  }

  KillTagsParse() : void {
    var killList : string[];
    killList  = this.killTags.split(",");
    killList.forEach(s => {
      if (this.picture.tags.includes(s))
      {
        this.dataService.removeTagFromPicture(this.picture, s);
      }
    })
    
    

  }*/
}
/*
{{picture.name}}

Tags
<div *ngFor = "let tag of picture.tags">
  {{ tag }}
  
</div>

<label>New Tags: 
    <input [(ngModel)]="newTags" placeholder=""/>

</label>

<button (click)="AddTags()">Add Tags</button>

<label>Remove Tags: 
    <input [(ngModel)]="killTags" placeholder=""/>

</label>

<button (click)="KillTagsParse()">Kill These Tags</button>
*/