import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceByKanjiComponent } from './sentence-by-kanji.component';

describe('SentenceByKanjiComponent', () => {
  let component: SentenceByKanjiComponent;
  let fixture: ComponentFixture<SentenceByKanjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceByKanjiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentenceByKanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
