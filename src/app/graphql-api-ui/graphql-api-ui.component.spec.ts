import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphqlApiUiComponent } from './graphql-api-ui.component';

describe('GraphqlApiUiComponent', () => {
  let component: GraphqlApiUiComponent;
  let fixture: ComponentFixture<GraphqlApiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphqlApiUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphqlApiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
