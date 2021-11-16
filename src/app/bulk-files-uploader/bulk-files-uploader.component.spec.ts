import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkFilesUploaderComponent } from './bulk-files-uploader.component';

describe('BulkFilesUploaderComponent', () => {
  let component: BulkFilesUploaderComponent;
  let fixture: ComponentFixture<BulkFilesUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkFilesUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkFilesUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
