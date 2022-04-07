import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QueryLanguageComponent } from './query-language.component';

describe('QueryLanguageComponent', () => {
  let component: QueryLanguageComponent;
  let fixture: ComponentFixture<QueryLanguageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
