import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RobustLinkComponent } from './robust-link.component';

describe('RobustLinkComponent', () => {
  let component: RobustLinkComponent;
  let fixture: ComponentFixture<RobustLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [RobustLinkComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobustLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
