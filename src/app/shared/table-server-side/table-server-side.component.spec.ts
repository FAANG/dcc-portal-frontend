import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableServerSideComponent } from './table-server-side.component';

describe('TableServerSideComponent', () => {
  let component: TableServerSideComponent;
  let fixture: ComponentFixture<TableServerSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [TableServerSideComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableServerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
