import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiComponent } from './kanji.component';

describe('KanjiComponent', () => {
  let component: KanjiComponent;
  let fixture: ComponentFixture<KanjiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanjiComponent]
    });
    fixture = TestBed.createComponent(KanjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
