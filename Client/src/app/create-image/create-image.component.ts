import { Component, OnInit } from '@angular/core';
import { ImageService } from './Image.service';



@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.component.html',
  styleUrls: ['./create-image.component.css']
})
export class CreateImageComponent implements OnInit {

  constructor(
    private imageService: ImageService

  ) { }

  ngOnInit() {
  }

   // At the drag drop area
  // (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log('No file selected!');
      return

    }
    let file: File = files[0];

    this.imageService.uploadFile('./upload', file)
      .subscribe(
        event => {
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
          console.log(" uF Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      )
  }

}



