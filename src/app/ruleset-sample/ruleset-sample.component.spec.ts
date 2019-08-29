import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesetSampleComponent } from './ruleset-sample.component';

describe('RulesetSampleComponent', () => {
  let component: RulesetSampleComponent;
  let fixture: ComponentFixture<RulesetSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesetSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
