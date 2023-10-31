import {Component, OnInit} from '@angular/core';
import {Subject} from "../../interfaces/interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {RequestKardex} from "../../models/RequestKardex";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";
import {DailogService} from "../../services/dialog/dailog.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass'],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class AdminPageComponent implements OnInit{

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

  filterForm: FormGroup | undefined;

  dateFrom: string = '';
  dateTo: string = '';
  requestState: string = '';
  selected = "Pendiente"


  constructor(private requestKardexService: RequestKardexService, private dialog: DailogService, private router: Router, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: [''],
      requestState: [''],
    });
  }

  ngOnInit() {
    this.getData();
  }

  openDialog(request: RequestKardex) {
    this.dialog.openAdmin(request);
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

  onFilter() {
    this.page = 0;
    // @ts-ignore
    this.dateFrom = this.filterForm.get('dateFrom')?.value ?? '';
    // @ts-ignore
    this.dateTo = this.filterForm.get('dateTo')?.value ?? '';
    // @ts-ignore
    this.requestState = this.selected;
    this.getData();
  }

  onClear() {
    this.filterForm?.reset();
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
