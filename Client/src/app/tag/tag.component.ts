import { Component, OnInit, Input } from '@angular/core';
import { tag } from '../tag';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() tag : tag;

  constructor( private route : ActivatedRoute, private router : Router , private dataService: DataService) { }

  ngOnInit() {
    this.getTag();
  }

  getTag() : void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id) {
        this.tag = this.dataService.getTag(id);
        
    }
  }

}
