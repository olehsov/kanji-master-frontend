import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiesComponent } from './kanjies.component';

describe('KanjiComponent', () => {
  let component: KanjiesComponent;
  let fixture: ComponentFixture<KanjiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanjiesComponent]
    });
    fixture = TestBed.createComponent(KanjiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
