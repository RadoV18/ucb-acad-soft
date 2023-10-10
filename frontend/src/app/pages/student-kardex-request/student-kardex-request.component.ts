import {Component, OnInit} from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DailogService} from "../../services/dialog/dailog.service";
import {Router} from "@angular/router";
import {KardexService} from "../../services/kardex-sevice/kardex.service";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-student-kardex-request',
  templateUrl: './student-kardex-request.component.html',
  styleUrls: ['./student-kardex-request.component.sass'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})

export class StudentKardexRequestComponent implements OnInit{



  displayedColumns: string[] = [
    'requestId',
    'requestDate',
    'requestStatus',
    'requestDetail'
  ];

  dataSource = new MatTableDataSource<RequestKardex>();

  orderBy: string = 'id';
  order: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 100;

  constructor(private requestKardexService: RequestKardexService, private dialog: DailogService, private router: Router) {
  }



  ngOnInit(): void {
    this.getData();
  }

  openDialog(request: RequestKardex) {
    this.dialog.open(request);
  }

  sendToNewRequest() {
    this.router.navigate(['/student/request/kardex/new']);
  }

  onSortChange(event: any) {
    this.order = event.direction;
    this.orderBy = event.active;
    this.getData();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getData();
  }

  onPageSizeChange(event: any) {
    this.page = 0;
    this.size = event.pageSize;
    this.getData();
  }

  getData() {
    this.requestKardexService.getMyKardexRequests(this.page, this.size, this.order, this.orderBy).subscribe({
      next: (data) => {
        this.dataSource.data = data.data.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

function getSpanishPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Última página';
  return paginatorIntl;
}
