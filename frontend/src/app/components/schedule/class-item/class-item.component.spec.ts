import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassItemComponent } from './class-item.component';

describe('ClassItemComponent', () => {
  let component: ClassItemComponent;
  let fixture: ComponentFixture<ClassItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassItemComponent]
    });
    fixture = TestBed.createComponent(ClassItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
