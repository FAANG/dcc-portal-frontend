import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalDataTableComponent } from './portal-data-table.component';

describe('PortalDataTableComponent', () => {
  let component: PortalDataTableComponent;
  let fixture: ComponentFixture<PortalDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
