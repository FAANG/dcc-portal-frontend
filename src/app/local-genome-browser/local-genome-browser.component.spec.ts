import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalGenomeBrowserComponent } from './local-genome-browser.component';

describe('LocalGenomeBrowserComponent', () => {
  let component: LocalGenomeBrowserComponent;
  let fixture: ComponentFixture<LocalGenomeBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalGenomeBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalGenomeBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
