import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlFetchedDataComponent } from './graphql-fetched-data.component';

describe('GraphqlFetchedDataComponent', () => {
  let component: GraphqlFetchedDataComponent;
  let fixture: ComponentFixture<GraphqlFetchedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphqlFetchedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlFetchedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
