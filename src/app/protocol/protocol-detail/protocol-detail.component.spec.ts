import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolDetailComponent } from './protocol-detail.component';

describe('ProtocolDetailComponent', () => {
  let component: ProtocolDetailComponent;
  let fixture: ComponentFixture<ProtocolDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
