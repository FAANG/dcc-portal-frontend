import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EurofaangInfoComponent } from './eurofaang-info.component';

describe('EurofaangInfoComponent', () => {
  let component: EurofaangInfoComponent;
  let fixture: ComponentFixture<EurofaangInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EurofaangInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EurofaangInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
