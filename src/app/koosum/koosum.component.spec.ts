import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoosumComponent } from './koosum.component';

describe('KoosumComponent', () => {
  let component: KoosumComponent;
  let fixture: ComponentFixture<KoosumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KoosumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KoosumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
