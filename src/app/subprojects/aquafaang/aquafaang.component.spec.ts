import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquafaangComponent } from './aquafaang.component';

describe('AquafaangComponent', () => {
  let component: AquafaangComponent;
  let fixture: ComponentFixture<AquafaangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AquafaangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquafaangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
