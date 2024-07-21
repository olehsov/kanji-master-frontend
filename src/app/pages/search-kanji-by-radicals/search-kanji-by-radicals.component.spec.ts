import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchKanjiByRadicalsComponent } from './search-kanji-by-radicals.component';

describe('SearchKanjiByRadicalsComponent', () => {
  let component: SearchKanjiByRadicalsComponent;
  let fixture: ComponentFixture<SearchKanjiByRadicalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchKanjiByRadicalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchKanjiByRadicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
