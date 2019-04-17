import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenFilesComponent } from './specimen-files.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimenFilesComponent', () => {
  let component: SpecimenFilesComponent;
  let fixture: ComponentFixture<SpecimenFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimenFilesComponent,
        RobustLinkComponent
      ],
      imports: [
        NgxPaginationModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimenFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
