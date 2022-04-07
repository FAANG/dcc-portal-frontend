import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AapComponent } from './aap.component';

describe('AapComponent', () => {
  let component: AapComponent;
  let fixture: ComponentFixture<AapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
