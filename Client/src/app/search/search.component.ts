import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { tag } from '../tag';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  @Input() tag;
  @Input() findPictures : boolean = false;
  @Input() findCollections : boolean = false;
  pictures
  collections

  constructor(private dataService: DataService) {  }

  ngOnInit() {
    if (this.findPictures)
    {
      this.getPictures()
    }
    if (this.findCollections)
    {
      this.getCollections()
    }

  }

  clear()
  {
    this.tag = null;
    
  }

  getPictures() {
    this.dataService.getTaggedPictures(this.tag).subscribe((pictures : {} ) => this.pictures = pictures);
  }
  getCollections() {
    this.dataService.getTaggedCollections(this.tag).subscribe((collections : {} ) => this.collections = collections);
  }

  doSearch(){
    var searchInput = ( document.getElementById('searchInput') as HTMLInputElement).value;
    console.log(searchInput)
    
    
    if (searchInput.trim().length > 0 && this.findPictures || this.findCollections)
    {
      this.tag = searchInput;
      if (this.findPictures)
        {this.getPictures();}
      if (this.findCollections)
        {this.getCollections();}
    }
    
   
      


  }

}
