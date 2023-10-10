import { Injectable } from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../components/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DailogService {

  constructor(private dialog: MatDialog) { }

  open(data: RequestKardex) {
    console.log("open dialog")
    return this.dialog.open(DialogComponent, {
      data: data
    });
  }
}
