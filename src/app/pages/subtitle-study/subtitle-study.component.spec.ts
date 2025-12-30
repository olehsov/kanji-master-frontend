import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleStudyComponent } from './subtitle-study.component';

describe('SubtitleStudyComponent', () => {
  let component: SubtitleStudyComponent;
  let fixture: ComponentFixture<SubtitleStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubtitleStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
