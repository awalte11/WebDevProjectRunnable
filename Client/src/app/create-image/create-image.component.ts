import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.css'],
  providers:  [ ImageService ]
})
export class CreateImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    this.ImageService.uploadFile(fileSelected)
    .subscribe( (response) => {
       console.log('set any success actions...');
       return response;
     },
      (error) => {
        console.log('set any error actions...');
      });
    }

}


