import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdaBovineComponent } from './usda-bovine.component';

describe('UsdaBovineComponent', () => {
  let component: UsdaBovineComponent;
  let fixture: ComponentFixture<UsdaBovineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsdaBovineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsdaBovineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
