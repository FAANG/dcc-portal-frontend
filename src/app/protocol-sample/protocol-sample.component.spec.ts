import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolSampleComponent } from './protocol-sample.component';

describe('ProtocolSampleComponent', () => {
  let component: ProtocolSampleComponent;
  let fixture: ComponentFixture<ProtocolSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
