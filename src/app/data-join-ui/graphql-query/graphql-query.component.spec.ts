import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlQueryComponent } from './graphql-query.component';

describe('GraphqlQueryComponent', () => {
  let component: GraphqlQueryComponent;
  let fixture: ComponentFixture<GraphqlQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphqlQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
