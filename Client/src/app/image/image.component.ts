import { Component, OnInit, Input } from '@angular/core';
import { picture } from '../picture';
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
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  ngOnInit() {
      this.getPicture();
      
      
  }


  getPicture() {
    
    if (this.details)
    {
      
      this.id = this.route.snapshot.paramMap.get('id');

      this.dataService.getPicture(this.id).subscribe(picture =>
           {this.picture = picture.tag}, error => console.log("Error :: " + error),
            ()=> {
              console.log(this.picture.name);
              this.img = 'data:image/jpeg;base64,' + btoa(this.picture.picture)
            } );
      
      //this.picture = this.dataService.getPicture(id);
      

    }
  }
  manage(set : boolean) {
    this.managing = set
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
