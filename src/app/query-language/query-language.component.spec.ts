import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryLanguageComponent } from './query-language.component';

describe('QueryLanguageComponent', () => {
  let component: QueryLanguageComponent;
  let fixture: ComponentFixture<QueryLanguageComponent>;

  beforeEach(async(() => {
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
