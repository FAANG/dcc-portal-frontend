import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailComponent } from './file-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {RunFilesComponent} from '../../shared/run-files/run-files.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileDetailComponent,
        HeaderComponent,
        RobustLinkComponent,
        RunFilesComponent
      ],
      imports: [
        NgxSmartModalModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        NgxSmartModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
