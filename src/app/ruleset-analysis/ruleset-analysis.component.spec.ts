import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetAnalysisComponent } from './ruleset-analysis.component';

describe('RulesetAnalysisComponent', () => {
  let component: RulesetAnalysisComponent;
  let fixture: ComponentFixture<RulesetAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
