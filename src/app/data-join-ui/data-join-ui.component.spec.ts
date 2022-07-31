import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataJoinUiComponent } from './data-join-ui.component';

describe('DataJoinUiComponent', () => {
  let component: DataJoinUiComponent;
  let fixture: ComponentFixture<DataJoinUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataJoinUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataJoinUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
