import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSamplesDetailComponent } from './protocol-samples-detail.component';

describe('ProtocolSamplesDetailComponent', () => {
  let component: ProtocolSamplesDetailComponent;
  let fixture: ComponentFixture<ProtocolSamplesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSamplesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSamplesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
