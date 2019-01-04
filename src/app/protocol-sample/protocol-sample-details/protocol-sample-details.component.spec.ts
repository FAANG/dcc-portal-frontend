import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSampleDetailsComponent } from './protocol-sample-details.component';

describe('ProtocolSampleDetailsComponent', () => {
  let component: ProtocolSampleDetailsComponent;
  let fixture: ComponentFixture<ProtocolSampleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSampleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSampleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
