import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentComponent } from './protocol-experiment.component';

describe('ProtocolExperimentComponent', () => {
  let component: ProtocolExperimentComponent;
  let fixture: ComponentFixture<ProtocolExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
