import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UsfaangComponent} from './usfaang.component';

describe('UsfaangComponent', () => {
  let component: UsfaangComponent;
  let fixture: ComponentFixture<UsfaangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsfaangComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsfaangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
