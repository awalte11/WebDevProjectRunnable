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
  pictureArr : any[] = [];


  ngOnInit() {
    this.getCollection();
  }

  notLocal()
  {
    return !(this.route.snapshot.url.toString().startsWith("collection"));
  }

  getCollection(){

    
    if (this.id == null)
        this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getCollection(this.id).subscribe(collection =>
      {this.collection = collection.tag}, error => console.log("Error :: " + error),
        ()=> {
          console.log(this.collection.name);
          
          this.collection.pictures.forEach(element => {(this.dataService.getPictureNoImage(element).subscribe(pict => {this.pictureArr.push(pict.tag) }))})
          
        } );
    //console.log(this.collection._id)
    //console.log(this.collection.name)
    
  
    

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

  deleteCollection() : void  {
    this.dataService.DeleteCollection(this.id).subscribe();

    this.router.navigate(['frontpage'])
  }



}
