import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSamplesComponent } from './protocol-samples.component';

describe('ProtocolSamplesComponent', () => {
  let component: ProtocolSamplesComponent;
  let fixture: ComponentFixture<ProtocolSamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
