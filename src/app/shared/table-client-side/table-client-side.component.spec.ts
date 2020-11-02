import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientSideComponent } from './table-client-side.component';

describe('TableClientSideComponent', () => {
  let component: TableClientSideComponent;
  let fixture: ComponentFixture<TableClientSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableClientSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableClientSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
