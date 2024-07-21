import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiDrawingComponent } from './kanji-drawing.component';

describe('KanjiDrawingComponent', () => {
  let component: KanjiDrawingComponent;
  let fixture: ComponentFixture<KanjiDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanjiDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KanjiDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
