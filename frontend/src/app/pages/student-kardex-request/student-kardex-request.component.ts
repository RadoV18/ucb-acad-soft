import { Component } from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DailogService} from "../../services/dialog/dailog.service";

@Component({
  selector: 'app-student-kardex-request',
  templateUrl: './student-kardex-request.component.html',
  styleUrls: ['./student-kardex-request.component.sass']
})

export class StudentKardexRequestComponent {



  displayedColumns: string[] = [
    'requestId',
    'requestDate',
    'requestStatus',
    'requestDetail'
  ];

  dataSource : RequestKardex[] = [];


  constructor(private requestKardexService: RequestKardexService, private dialog: DailogService) {
  }



  ngOnInit(): void {
    this.requestKardexService.getMyKardexRequests().subscribe(
      {next: (response) => {
        console.log(response);
        this.dataSource = response.data;
      }}
    );
  }

  openDialog(request: RequestKardex) {
    this.dialog.open(request);
  }

}
