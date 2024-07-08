import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolAnalysisDetailsComponent } from './protocol-analysis-details.component';

describe('ProtocolAnalysisDetailsComponent', () => {
  let component: ProtocolAnalysisDetailsComponent;
  let fixture: ComponentFixture<ProtocolAnalysisDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtocolAnalysisDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolAnalysisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
