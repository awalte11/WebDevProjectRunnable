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


  @Input() collection = null;
  @Input() id;
  @Input() details = true;
  

  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  newTags: string;
  killTags: string;
  newName: string;
  newComment: string;
  newPics: any;
  killPics: any;
  managing : boolean = false;


  ngOnInit() {
    this.getCollection();
  }

  notLocal()
  {
    console.log(this.route.toString())
    return !(this.route.snapshot.url.toString().startsWith("collection"));
  }

  async getCollection(){
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.collection._id)
    //console.log(this.collection.name)
    if (this.id) {
      await this.dataService.getCollection(this.id).subscribe(collection => this.collection = collection.tag,
        error => console.log("Error :: " + error) );

    }
    else 
    {
      this.id = this.collection._id;
    }
  }

  goToCollection()
  {
    console.log(this.id)
    this.router.navigate(["/collection/" + this.id])
  }



  AddTags() : void  {
    var newTagsArr : string[];
    newTagsArr  = this.newTags.split(",");
    this.dataService.addTagsToCollection(this.collection, newTagsArr)


  }

  KillTagsParse() : void {
    var killList : string[];
    killList  = this.killTags.split(",");
    this.dataService.removeTagsFromCollection(this.collection, killList);

  }

  manage(set : boolean) {
    this.managing = set
  }

  AddPictures() : void  {

   
    this.newPics  = this.newPics.split(",");
    this.dataService.addPicturesToCollection(this.collection, this.newPics)

  }

  KillPictures() : void {
    var killList : string[];
    killList  = this.killPics.split(",");
    this.dataService.removePicturesFromCollection(this.collection, killList);
    
  }





}
