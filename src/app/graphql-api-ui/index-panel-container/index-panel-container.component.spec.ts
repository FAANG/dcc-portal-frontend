import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelContainerComponent } from './index-panel-container.component';

describe('IndexPanelContainerComponent', () => {
  let component: IndexPanelContainerComponent;
  let fixture: ComponentFixture<IndexPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPanelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
