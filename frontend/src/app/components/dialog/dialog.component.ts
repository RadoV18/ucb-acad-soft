import {Component, Inject} from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RequestKardex) {}

}
