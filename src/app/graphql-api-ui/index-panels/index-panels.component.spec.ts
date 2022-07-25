import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelsComponent } from './index-panels.component';

describe('IndexPanelsComponent', () => {
  let component: IndexPanelsComponent;
  let fixture: ComponentFixture<IndexPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPanelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
