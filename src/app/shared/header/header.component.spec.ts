import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleCollapse should toggle value of collapsed variable', () => {
    expect(component.collapsed).toEqual(true);
    component.toggleCollapse();
    expect(component.collapsed).toEqual(false);
    component.toggleCollapse();
    expect(component.collapsed).toEqual(true);
  });

  it('should toggle project dropdown open on projectsOnDropdownClick', () => {
    component.projects_dropdown_open = true;
    component.records_dropdown_open = true;
    component.validation_dropdown_open = true;
    component.projectsOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(false);
    expect(component.records_dropdown_open).toEqual(false);
    expect(component.validation_dropdown_open).toEqual(false);
    component.projectsOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(true);
    expect(component.records_dropdown_open).toEqual(false);
    expect(component.validation_dropdown_open).toEqual(false);
  });

  it('should toggle records dropdown open on projectsOnDropdownClick', () => {
    component.projects_dropdown_open = true;
    component.records_dropdown_open = true;
    component.validation_dropdown_open = true;
    component.recordsOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(false);
    expect(component.records_dropdown_open).toEqual(false);
    expect(component.validation_dropdown_open).toEqual(false);
    component.recordsOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(false);
    expect(component.records_dropdown_open).toEqual(true);
    expect(component.validation_dropdown_open).toEqual(false);
  });

  it('should toggle validation dropdown open on projectsOnDropdownClick', () => {
    component.projects_dropdown_open = true;
    component.records_dropdown_open = true;
    component.validation_dropdown_open = true;
    component.validationOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(false);
    expect(component.records_dropdown_open).toEqual(false);
    expect(component.validation_dropdown_open).toEqual(false);
    component.validationOnDropdownClick();
    expect(component.projects_dropdown_open).toEqual(false);
    expect(component.records_dropdown_open).toEqual(false);
    expect(component.validation_dropdown_open).toEqual(true);
  });

  it('should hide banner', () => {
    component.hideBanner();
    expect(component.show_banner).toEqual('hide');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
