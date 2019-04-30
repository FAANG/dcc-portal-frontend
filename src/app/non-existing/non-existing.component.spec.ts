import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistingComponent } from './non-existing.component';

describe('NonExistingComponent', () => {
  let component: NonExistingComponent;
  let fixture: ComponentFixture<NonExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
