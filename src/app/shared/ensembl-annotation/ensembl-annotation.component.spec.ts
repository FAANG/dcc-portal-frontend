import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblAnnotationComponent } from './ensembl-annotation.component';

describe('EnsemblAnnotationComponent', () => {
  let component: EnsemblAnnotationComponent;
  let fixture: ComponentFixture<EnsemblAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [EnsemblAnnotationComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
