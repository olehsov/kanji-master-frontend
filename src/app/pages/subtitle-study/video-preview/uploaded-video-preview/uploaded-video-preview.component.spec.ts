import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedVideoPreviewComponent } from './uploaded-video-preview.component';

describe('UploadedVideoPreviewComponent', () => {
  let component: UploadedVideoPreviewComponent;
  let fixture: ComponentFixture<UploadedVideoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadedVideoPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadedVideoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
