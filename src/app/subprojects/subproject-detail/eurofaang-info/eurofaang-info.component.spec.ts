import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EurofaangInfoComponent } from './eurofaang-info.component';

describe('EurofaangInfoComponent', () => {
  let component: EurofaangInfoComponent;
  let fixture: ComponentFixture<EurofaangInfoComponent>;

  beforeEach(waitForAsync(() => {
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
