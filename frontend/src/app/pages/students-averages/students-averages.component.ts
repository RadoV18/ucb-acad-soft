import { Component } from '@angular/core';
import { StudentAverageDTO } from 'src/app/dto/student-average.dto';
import { StudentAverageService } from 'src/app/services/student-average.service';

@Component({
  selector: 'app-students-averages',
  templateUrl: './students-averages.component.html',
  styleUrls: ['./students-averages.component.sass']
})
export class StudentsAveragesComponent {
  displayedColumns: string[] = ['Rango', 'Estudiante', 'Carrera', 'Materias', 'Promedio'];

  top3List: StudentAverageDTO[] = [];
  othersList: StudentAverageDTO[] = [];

  constructor(private studentAverageService: StudentAverageService) {
    this.studentAverageService.GetStudentsAveragesList().subscribe((response) => {
      this.top3List = response.slice(0, 3);
      this.othersList = response.slice(3);
    });
  }

  onDownloadClick() {
    this.studentAverageService.getPdfReport().subscribe((response) => {
      if (response.successful) {
        window.open(response.data, '_blank');
      }
    });
  }
}
