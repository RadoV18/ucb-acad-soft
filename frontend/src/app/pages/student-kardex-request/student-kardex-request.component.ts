import { Component } from '@angular/core';
import {RequestKardex} from "../../models/RequestKardex";
import {RequestKardexService} from "../../services/request-kardex-service/request-kardex.service";

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

  dataSource : RequestKardex[] = [
    // {
    //   id: 1,
    //   date: "2021-05-01",
    //   status: "Pendiente",
    //   detail: {
    //     reason: "Porque si",
    //     image: "url"
    //   }
    // },
    // {
    //   id: 2,
    //   date: "2021-05-01",
    //   status: "Pendiente",
    //   detail: {
    //     reason: "Porque si",
    //     image: "url"
    //   }
    // },
    // {
    //   id: 3,
    //   date: "2021-05-01",
    //   status: "Pendiente",
    //   detail: {
    //     reason: "Porque si",
    //     image: "url"
    //   }
    // },
    // {
    //   id: 4,
    //   date: "2021-05-01",
    //   status: "Rechazado",
    //   detail: {
    //     reason: "Porque si",
    //     image: "url"
    //   }
    // },
    // {
    //   id: 5,
    //   date: "2021-05-01",
    //   status: "Aceptado",
    //   detail: {
    //     reason: "Porque si",
    //     image: "url"
    //   }
    // },
  ];


  constructor(private requestKardexService: RequestKardexService) {
  }

  ngOnInit(): void {
    this.requestKardexService.getMyKardexRequests().subscribe(
      {next: (response) => {
        console.log(response);
        this.dataSource = response.data;
      }}
    );
  }

}
