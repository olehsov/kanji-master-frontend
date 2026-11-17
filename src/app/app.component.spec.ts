import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('renders the navigation', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'nav a',
    );
    expect(links.length).toBe(4);
  });
});
