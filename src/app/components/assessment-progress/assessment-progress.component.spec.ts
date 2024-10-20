import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProgressComponent } from './assessment-progress.component';

describe('AssessmentProgressComponent', () => {
  let component: AssessmentProgressComponent;
  let fixture: ComponentFixture<AssessmentProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentProgressComponent]
    });
    fixture = TestBed.createComponent(AssessmentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
