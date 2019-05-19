import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  ngOnInit(): void {
   
  }

  constructor(private dataService: DataService, private router: Router) {  }

  newID : string;
  collName : string;

  async makeCollection() {
    const comment  = ( document.getElementById('comments') as HTMLInputElement).value;
    const tags  = ( document.getElementById('tags') as HTMLInputElement).value.split(',');
    const pictures  = ( document.getElementById('pictures') as HTMLInputElement).value.split(',');
    if (!(this.collName == null || this.collName == ""))
    {
      var pict = this.dataService.CreateCollection(this.collName, comment, tags, pictures)
      pict.subscribe(
        event => {
          for(var key in event)
          {
            if (key == "id")
            {
              this.newID = event[key];
            }

          }
          console.log(this.newID)
          if (this.newID != null)
          {
            this.router.navigate(['collection/' + this.newID])
          }
          
        },
        (err) => {
          console.log(' uF Upload Error:', err);
        }, () => {
          console.log('Upload done');
          
        }
      )
    }
  }
}
