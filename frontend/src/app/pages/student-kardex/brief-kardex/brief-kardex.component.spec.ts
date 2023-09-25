import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefKardexComponent } from './brief-kardex.component';

describe('BriefKardexComponent', () => {
  let component: BriefKardexComponent;
  let fixture: ComponentFixture<BriefKardexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BriefKardexComponent]
    });
    fixture = TestBed.createComponent(BriefKardexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
