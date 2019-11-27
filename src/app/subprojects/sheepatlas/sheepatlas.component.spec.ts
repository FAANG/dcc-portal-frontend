import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepatlasComponent } from './sheepatlas.component';

describe('SheepatlasComponent', () => {
  let component: SheepatlasComponent;
  let fixture: ComponentFixture<SheepatlasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheepatlasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepatlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
