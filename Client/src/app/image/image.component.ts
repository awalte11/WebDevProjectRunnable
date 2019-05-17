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

  @Input() picture : picture;
  @Input() details = true;
  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  ngOnInit() {
      //this.getPicture();
      
    
  }

  getPicture() : void {
    if (this.details)
    {
      const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      if (id) {
          this.picture = this.dataService.getPicture(id);
          this.details = true;
      }
    }
  }

}
