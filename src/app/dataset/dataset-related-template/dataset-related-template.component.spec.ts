import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetRelatedTemplateComponent } from './dataset-related-template.component';

describe('DatasetRelatedTemplateComponent', () => {
  let component: DatasetRelatedTemplateComponent;
  let fixture: ComponentFixture<DatasetRelatedTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetRelatedTemplateComponent ]
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
