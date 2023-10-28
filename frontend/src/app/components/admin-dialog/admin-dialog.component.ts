import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RequestKardex} from "../../models/RequestKardex";

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.sass']
})
export class AdminDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RequestKardex) {
  }

}
