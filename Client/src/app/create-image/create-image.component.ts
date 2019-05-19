import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';



@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',

  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent implements OnInit {

  constructor(
    private dataService: DataService

  ) { }

  currentFile : File;
  currentBlob : string;

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
    console.log(this.currentBlob)
    
  }

  

  uploadFile() {
    const name  = ( document.getElementById('name') as HTMLInputElement).value;
    const comment  = ( document.getElementById('comments') as HTMLInputElement).value;
    const tags  = ( document.getElementById('tags') as HTMLInputElement).value.split(',');
    var pict = this.dataService.createPicture(this.currentBlob, name, comment, tags)
      .subscribe(
        event => {
          console.log(event.toString())
            /*
          if (event.type == HttpEvent.type.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
          */
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





