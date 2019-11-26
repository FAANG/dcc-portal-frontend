import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSwitchComponent } from './gene-switch.component';

describe('GeneSwitchComponent', () => {
  let component: GeneSwitchComponent;
  let fixture: ComponentFixture<GeneSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
