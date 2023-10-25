import {Component, OnInit} from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DailogService} from "../../services/dialog/dailog.service";
import {Router} from "@angular/router";
import {KardexService} from "../../services/kardex-sevice/kardex.service";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";

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
    'id',
    'date',
    'request_state',
    'request_detail',
  ];

  dataSource = new MatTableDataSource<RequestKardex>();

  orderBy: string = 'id';
  order: string = 'asc';
  page: number = 0;
  size: number = 10;
  totalElements: number = 100;

  filterForm: FormGroup;

  dateFrom: string = '';
  dateTo: string = '';
  requestState: string = '';




  constructor(private requestKardexService: RequestKardexService, private dialog: DailogService, private router: Router, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      requestState: [''],
    });
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
    this.requestKardexService.getMyKardexRequests(this.page, this.size, this.order, this.orderBy, this.dateFrom, this.dateTo, this.requestState).subscribe({
      next: (data) => {
        this.dataSource.data = data.data.content;
        this.totalElements = data.data.totalElements;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onFilter() {
    console.log(this.requestState)
    this.page = 0;
    this.dateFrom = this.filterForm.get('dateFrom')?.value ?? '';
    this.dateTo = this.filterForm.get('dateTo')?.value ?? '';
    this.requestState = this.filterForm.get('requestState')?.value ?? '';
    this.getData();
  }

  onClear() {
    this.filterForm?.reset();
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
