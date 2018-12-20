import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentsDetailComponent } from './protocol-experiments-detail.component';

describe('ProtocolExperimentsDetailComponent', () => {
  let component: ProtocolExperimentsDetailComponent;
  let fixture: ComponentFixture<ProtocolExperimentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolExperimentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolExperimentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
