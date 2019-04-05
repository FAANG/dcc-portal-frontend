import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesSummaryComponent } from './files-summary.component';

describe('FilesSummaryComponent', () => {
  let component: FilesSummaryComponent;
  let fixture: ComponentFixture<FilesSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
