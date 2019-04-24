import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetRelatedTemplateComponent } from './dataset-related-template.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';

describe('DatasetRelatedTemplateComponent', () => {
  let component: DatasetRelatedTemplateComponent;
  let fixture: ComponentFixture<DatasetRelatedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatasetRelatedTemplateComponent,
        RobustLinkComponent
      ],
      imports: [
        NgxPaginationModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetRelatedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
