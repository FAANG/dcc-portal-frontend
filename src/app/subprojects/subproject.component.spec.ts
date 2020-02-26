import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectsComponent } from './subprojects.component';
import { HeaderComponent } from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SubprojectsLandingComponent', () => {
  let component: SubprojectsComponent;
  let fixture: ComponentFixture<SubprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubprojectsComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
