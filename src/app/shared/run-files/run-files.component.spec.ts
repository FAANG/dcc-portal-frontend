import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunFilesComponent } from './run-files.component';

describe('RunFilesComponent', () => {
  let component: RunFilesComponent;
  let fixture: ComponentFixture<RunFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
