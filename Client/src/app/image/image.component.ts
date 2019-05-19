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
  details2 = false;
  img : string;
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  ngOnInit() {
      this.getPicture();
      
      this.deployPicture();
  }
  deployPicture() {
      
  }

  getPicture() {
    
    if (this.details)
    {
      
      const id = this.route.snapshot.paramMap.get('id');
      this.dataService.getPicture(id).subscribe(picture =>
           {this.picture = picture.tag}, error => console.log("Error :: " + error),
            ()=> {
              console.log(this.picture.name);
              this.img = 'data:image/jpeg;base64,' + btoa(this.picture.picture)
            } );
      
      //this.picture = this.dataService.getPicture(id);
      

    }
  }

}
