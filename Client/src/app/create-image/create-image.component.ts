import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { picture } from '../picture';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',

  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent implements OnInit {

  constructor(
    private dataService: DataService, private router: Router

  ) { }

  currentFile : File;
  currentBlob : string;
  newPicture : picture;
  newID : string;
  ngOnInit() {
  }


   // At the drag drop area
  // (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    //this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  async selectFile(event) {
    this.currentFile = event.target.files[0];
    this.currentBlob = await readUploadedFileAsBS(this.currentFile);

    
  }

  

  async uploadFile() {
    const name  = ( document.getElementById('name') as HTMLInputElement).value;
    const comment  = ( document.getElementById('comments') as HTMLInputElement).value;
    const tags  = ( document.getElementById('tags') as HTMLInputElement).value.split(',');
    
    var pict = this.dataService.createPicture(this.currentBlob, name, comment, tags)
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
            this.router.navigate(['image/' + this.newID])
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

const readUploadedFileAsBS = (inputFile : File) => {
  const temporaryFileReader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result.toString());
    };
    temporaryFileReader.readAsBinaryString(inputFile);
  });
};






