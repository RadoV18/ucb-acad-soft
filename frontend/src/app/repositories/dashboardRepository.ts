import {createStore, setProp, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, withEntities} from "@ngneat/elf-entities";
import {DashboardCareerDto, CareerDto, ParallelDto, SubjectDto} from "../dto/carrer.dto";
import {Injectable} from "@angular/core";

export interface SemesterProps {
  selectedSemesterId: number;
}


export interface CarrerProps {
    selectedCarrerId: number;
}

export interface SubjectProps {
    selectedSubjectId: number;
}

export interface ParallelProps {
    selectedParallelId: number;
}

const semestersStore = createStore({
    name: 'semesters'
  },
  withProps<SemesterProps>({ selectedSemesterId: 1}),
  withEntities<DashboardCareerDto>()
);

const carrersStore = createStore({
    name: 'carrers'
  },
  withProps<CarrerProps>({ selectedCarrerId: 1}),
  withEntities<CareerDto>()
);

const subjectsStore = createStore({
    name: 'subjects'
  },
  withProps<SubjectProps>({ selectedSubjectId: 100}),
  withEntities<SubjectDto>()
);

const parallelsStore = createStore({
    name: 'parallels'
  },
  withProps<ParallelProps>({ selectedParallelId: 200}),
  withEntities<ParallelDto>()
);

@Injectable({ providedIn: 'root' })
export class DashboardRepository{
  semesters: DashboardCareerDto[] = [];
  semesters$ = semestersStore.pipe(selectAllEntities());
  carrers$ = carrersStore.pipe(selectAllEntities());
  subjects$ = subjectsStore.pipe(selectAllEntities());
  parallels$ = parallelsStore.pipe(selectAllEntities());

  setSemesters(semesters: DashboardCareerDto[]){
    semestersStore.update(setEntities(semesters))
  }

  getSelectedSemesterId(){
    return semestersStore.getValue().selectedSemesterId;
  }

  setSelectedSemesterId(id: number){
    semestersStore.update(setProp('selectedSemesterId', id));
    console.log("id", this.semesters)
    const semester = this.semesters.find(x => x.id === id);
    if (semester){
      this.setCarrers(semester.careers)
    }
  }

  setCarrers(carrers: CareerDto[]) {
      carrersStore.update(setEntities(carrers));
  }

  getSelectedCarrerId() {
      return carrersStore.getValue().selectedCarrerId;
  }

  setSelectedCarrerId(id: number) {
      carrersStore.update(setProp('selectedCarrerId', id));
      const semester = this.semesters.find(x => x.id === this.getSelectedSemesterId());
      const career = semester?.careers.find(x => x.id === id)
      if (career) {
          this.setSubjects(career.subjects);
      }
  }

  setSubjects(subjects: SubjectDto[]) {
      subjectsStore.update(setEntities(subjects));
  }


  getSelectedSubjectId() {
      return subjectsStore.getValue().selectedSubjectId;
  }

  setSelectedSubjectId(subjectId: number) {
      subjectsStore.update(setProp('selectedSubjectId', subjectId));
      const semester = this.semesters.find(
        x => x.id === this.getSelectedSemesterId()
      )
      const carrer  = semester?.careers.find(
        x => x.id === this.getSelectedCarrerId()
      );

      const subject = carrer?.subjects.find(
        x => x.id === subjectId

      );
      if (subject) {
          this.setParallels(subject.parallels);
      }
  }

  setParallels(parallels: ParallelDto[]) {
      parallelsStore.update(setEntities(parallels));
  }

  setSelectedParallelId(id: number) {
    parallelsStore.update(setProp('selectedParallelId', id));
  }

  getSelectedParallelId(){
    return parallelsStore.getValue().selectedParallelId;

  }

  setSemesterDto(semeseter: DashboardCareerDto[]) {
      this.semesters = semeseter;
  }






}
