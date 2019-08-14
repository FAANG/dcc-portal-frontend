import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemsComponent } from './related-items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimenFilesComponent', () => {
  let component: RelatedItemsComponent;
  let fixture: ComponentFixture<RelatedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RelatedItemsComponent,
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
    fixture = TestBed.createComponent(RelatedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
