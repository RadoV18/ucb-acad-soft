import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RequestKardex} from "../../models/RequestKardex";
import {DailogService} from "../../services/dialog/dailog.service";
import {AdminServiceService} from "../../services/admin-service/admin-service.service";

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.sass']
})
export class AdminDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: RequestKardex, private dialog: DailogService, private adminRequestService: AdminServiceService) {
  }


  openDateDialog(request: RequestKardex) {
    console.log("open date dialog");
    this.dialog.openDateDialog(request)
  }

  rejectRequest(request: RequestKardex) {
    console.log("reject request");
    this.adminRequestService.adminRejectRequest(request.id).subscribe(
      (response) => {
        console.log(response);
      });
  }

}
