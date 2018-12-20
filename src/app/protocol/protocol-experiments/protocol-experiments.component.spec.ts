import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentsComponent } from './protocol-experiments.component';

describe('ProtocolExperimentsComponent', () => {
  let component: ProtocolExperimentsComponent;
  let fixture: ComponentFixture<ProtocolExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
