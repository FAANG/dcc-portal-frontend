import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetExperimentComponent } from './ruleset-experiment.component';

describe('RulesetExperimentComponent', () => {
  let component: RulesetExperimentComponent;
  let fixture: ComponentFixture<RulesetExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
