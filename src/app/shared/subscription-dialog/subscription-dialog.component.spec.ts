import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDialogComponent } from './subscription-dialog.component';

describe('SubscriptionDialogComponent', () => {
  let component: SubscriptionDialogComponent;
  let fixture: ComponentFixture<SubscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SubscriptionDialogComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
