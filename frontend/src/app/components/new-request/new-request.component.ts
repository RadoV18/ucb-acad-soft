import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.sass']
})
export class NewRequestComponent {

  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  imageFile: File | null = null;

  constructor(private router: Router) {  }


  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadPreview(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.loadPreview(file);
    }
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  loadPreview(file: File) {
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageURL = null;
  }




}
