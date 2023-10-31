import {Component, Inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {DatePipe} from "@angular/common";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestKardex} from "../../models/RequestKardex";
import {AdminServiceService} from "../../services/admin-service/admin-service.service";

@Component({
  selector: 'app-admin-date-dialog',
  templateUrl: './admin-date-dialog.component.html',
  styleUrls: ['./admin-date-dialog.component.sass'],
})
export class AdminDateDialogComponent {
  selectedDate: Date | null | undefined;

  formattedDate: string | null = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RequestKardex,
    private request: AdminServiceService,
    private dialogRef: MatDialogRef<AdminDateDialogComponent>
  ) { }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
  }

  acceptKardexRequest() {
    console.log("accept kardex request");
    console.log(this.selectedDate);
    const datePipe = new DatePipe('en-US');
    this.formattedDate = datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    console.log(this.formattedDate);
    this.request.adminAcceptRequest(this.formattedDate, this.data.id ).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
