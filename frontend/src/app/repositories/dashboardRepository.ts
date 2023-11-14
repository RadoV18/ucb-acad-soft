import {createStore, setProp, withProps} from "@ngneat/elf";
import {selectAllEntities, setEntities, withEntities} from "@ngneat/elf-entities";
import {CarrerDto, ParallelDto, SubjectDto} from "../dto/carrer.dto";
import {Injectable} from "@angular/core";

export interface CarrerProps {
    selectedCarrerId: number;
}

export interface SubjectProps {
    selectedSubjectId: number;
}

export interface ParallelProps {
    selectedParallelId: number;
}

const carrersStore = createStore({
    name: 'carrers'
  },
  withProps<CarrerProps>({ selectedCarrerId: 1}),
  withEntities<CarrerDto>()
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
  carrerDto: CarrerDto[] = [];
  carrers$ = carrersStore.pipe(selectAllEntities());
  subjects$ = subjectsStore.pipe(selectAllEntities());
  parallels$ = parallelsStore.pipe(selectAllEntities());
  setCarrers(carrers: CarrerDto[]) {
      carrersStore.update(setEntities(carrers));
  }

  getSelectedCarrerId() {
      return carrersStore.getValue().selectedCarrerId;
  }

  setSelectedCarrerId(id: number) {
      carrersStore.update(setProp('selectedCarrerId', id));
      const carrer = this.carrerDto.find(
        x => x.id === id
      );
      if (carrer) {
          this.setSubjects(carrer.subjects);
      }
  }

  setSubjects(subjects: SubjectDto[]) {
      subjectsStore.update(setEntities(subjects));
  }


  getSelectedSubjectId() {
      return subjectsStore.getValue().selectedSubjectId;
  }

  setSelectedSubjectId(carrerId: number, subjectId: number) {
      subjectsStore.update(setProp('selectedSubjectId', subjectId));
      const carrer  = this.carrerDto.find(
        x => x.id === carrerId);
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




}
