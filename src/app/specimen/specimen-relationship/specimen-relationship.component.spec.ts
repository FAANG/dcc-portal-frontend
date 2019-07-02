import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenRelationshipComponent } from './specimen-relationship.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimenFilesComponent', () => {
  let component: SpecimenRelationshipComponent;
  let fixture: ComponentFixture<SpecimenRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimenRelationshipComponent,
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
    fixture = TestBed.createComponent(SpecimenRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
