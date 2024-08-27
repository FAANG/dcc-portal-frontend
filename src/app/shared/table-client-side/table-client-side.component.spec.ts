import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableClientSideComponent } from './table-client-side.component';

describe('TableClientSideComponent', () => {
  let component: TableClientSideComponent;
  let fixture: ComponentFixture<TableClientSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [TableClientSideComponent]
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
