import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyingComponent } from './studying.component';

describe('StudyingComponent', () => {
  let component: StudyingComponent;
  let fixture: ComponentFixture<StudyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
