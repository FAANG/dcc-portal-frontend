import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolAnalysisComponent } from './protocol-analysis.component';

describe('ProtocolAnalysisComponent', () => {
  let component: ProtocolAnalysisComponent;
  let fixture: ComponentFixture<ProtocolAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
