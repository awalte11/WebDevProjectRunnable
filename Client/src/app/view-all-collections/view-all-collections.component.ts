import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-all-collections',
  templateUrl: './view-all-collections.component.html',
  styleUrls: ['./view-all-collections.component.css']
})
export class ViewAllCollectionsComponent implements OnInit {

  constructor(private dataService : DataService, private router : Router ) { }

  collections: any = [];



  getCollections() : void {
    this.dataService.GetAllCollections().subscribe((collections : {} ) => this.collections = collections);
  }

  ngOnInit() {
   this.getCollections(); 
  }

}
