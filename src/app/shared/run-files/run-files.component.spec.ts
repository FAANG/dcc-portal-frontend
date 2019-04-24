import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunFilesComponent } from './run-files.component';
import {RobustLinkComponent} from '../robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RunFilesComponent', () => {
  let component: RunFilesComponent;
  let fixture: ComponentFixture<RunFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RunFilesComponent,
        RobustLinkComponent
      ],
      imports: [
        HttpClientTestingModule
      ]
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
