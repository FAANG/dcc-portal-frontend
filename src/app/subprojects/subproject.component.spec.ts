import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SubprojectComponent } from './subproject.component';
import { HeaderComponent } from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SubprojectsLandingComponent', () => {
  let component: SubprojectComponent;
  let fixture: ComponentFixture<SubprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubprojectComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
