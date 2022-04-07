import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubprojectComponent } from './subproject.component';
import { HeaderComponent } from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SubprojectsLandingComponent', () => {
  let component: SubprojectComponent;
  let fixture: ComponentFixture<SubprojectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubprojectComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
