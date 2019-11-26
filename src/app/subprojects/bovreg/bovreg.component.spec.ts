import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BovregComponent } from './bovreg.component';

describe('BovregComponent', () => {
  let component: BovregComponent;
  let fixture: ComponentFixture<BovregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BovregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BovregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
