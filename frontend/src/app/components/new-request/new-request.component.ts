import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.sass']
})
export class NewRequestComponent {

  imageURL: string | ArrayBuffer | null = null;
  isDragging = false;
  imageFile: File | null = null;

  reasson: FormControl = new FormControl('');

  constructor(
    private router: Router,
    public formService: RequestKardexService,

  ) {  }


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

  sendToMyRequests() {
   this.formService.newKardexRequest(this.reasson.value, this.imageFile).subscribe(
      {next: (response) => {
        console.log(response);
        this.router.navigate(['/student/request/kardex'])

      }, error: (error) => {
        console.log(error);
        }
      }
   )
  }





}
