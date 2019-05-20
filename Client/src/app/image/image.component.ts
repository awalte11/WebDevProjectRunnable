import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() picture = null;
  @Input() details = true;
   managing : boolean = false;
  
  @Input() id;
  img : string;
  newTags: string;
  killTags: string;
  newName: string;
  newComment: string;
  newCollName: string;
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  ngOnInit() {
    console.log(this.picture)
      this.getPicture();
      
      
  }


  getPicture() {
    
    if (this.details)
    {
      if (this.id == null)
        this.id = this.route.snapshot.paramMap.get('id');
      this.dataService.getPicture(this.id).subscribe(picture =>
        {this.picture = picture.tag}, error => console.log("Error :: " + error),
        ()=> {
          console.log(this.picture.name);
          this.img = 'data:image/jpeg;base64,' + btoa(this.picture.picture)
        } );
    }
    else {
      console.log(this.picture)
      console.log(this.id)
    }
  }
  manage(set : boolean) {
    this.managing = set
  }
  goToImage()
  {
    console.log(this.id)
    this.router.navigate(["/image/" + this.picture._id])
  }

  
  notLocal()
  {
    return !(this.route.snapshot.url.toString().startsWith("image"));
  }

  AddTags() : void  {
    var newTagsArr : string[];
    newTagsArr  = this.newTags.split(",");
    console.log(newTagsArr)
    this.dataService.addTagsToPicture(this.id, newTagsArr).subscribe();


  }

  Rename() : void  {
    this.dataService.renamePicture(this.id, this.newName).subscribe();

   
  }

  addToCollection() : void {
    var newColl = this.newCollName.trim();
    this.dataService.addPictureToNamedCollection(newColl, this.id).subscribe();
  }

  
  deleteImage() : void  {
    this.dataService.DeletePicture(this.id).subscribe();

    this.router.navigate(['frontpage'])
  }

  reComment() : void  {
    this.dataService.reCommentPicture(this.id, this.newComment).subscribe();


  }

  KillTagsParse() : void {
    var killList : string[];
    killList  = this.killTags.split(",");
    this.dataService.removeTagsFromPicture(this.id, killList).subscribe();;

    

  }

}
