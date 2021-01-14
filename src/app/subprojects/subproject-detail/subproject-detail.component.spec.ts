import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SubprojectDetailComponent } from './subproject-detail.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiDataService} from '../../services/api-data.service';
import {of as observableOf} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

describe('SubprojectDetailComponent', () => {
  let component: SubprojectDetailComponent;
  let fixture: ComponentFixture<SubprojectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubprojectDetailComponent,
        HeaderComponent,
        RelatedItemsComponent,
        RobustLinkComponent
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get related items count on load', () => {
    const service = TestBed.get(ApiDataService);
    spyOn(service, 'getProjectOrganismsCount').and.returnValue(observableOf(5));
    spyOn(service, 'getProjectSpecimensCount').and.returnValue(observableOf(6));
    spyOn(service, 'getProjectPublicationsCount').and.returnValue(observableOf(7));
    spyOn(service, 'getProjectFilesCount').and.returnValue(observableOf(8));
    component.ngOnInit();
    expect(service.getProjectOrganismsCount).toHaveBeenCalled();
    expect(service.getProjectSpecimensCount).toHaveBeenCalled();
    expect(service.getProjectPublicationsCount).toHaveBeenCalled();
    expect(service.getProjectFilesCount).toHaveBeenCalled();
    expect(component.relatedItemsCount).toEqual({'Organisms': 5, 'Specimens': 6, 'Publications': 7, 'Files': 8});
  });

  it('should table type', () => {
    component.setTableType('test');
    expect(component.tableType).toEqual('test');
  });

  it('should navigate to login page', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate').and.stub();
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
