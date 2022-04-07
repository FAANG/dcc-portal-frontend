import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilesUploadComponent } from './files-upload.component';

describe('FilesUploadComponent', () => {
  let component: FilesUploadComponent;
  let fixture: ComponentFixture<FilesUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
