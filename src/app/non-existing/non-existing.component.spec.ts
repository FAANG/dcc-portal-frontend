import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NonExistingComponent } from './non-existing.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('NonExistingComponent', () => {
  let component: NonExistingComponent;
  let fixture: ComponentFixture<NonExistingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [NonExistingComponent],
    imports: [
        RouterTestingModule,
        HeaderComponent
    ]
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
