import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlDisplayFetchedDataComponent } from './graphql-display-fetched-data.component';

describe('GraphqlDisplayFetchedDataComponent', () => {
  let component: GraphqlDisplayFetchedDataComponent;
  let fixture: ComponentFixture<GraphqlDisplayFetchedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphqlDisplayFetchedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlDisplayFetchedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
