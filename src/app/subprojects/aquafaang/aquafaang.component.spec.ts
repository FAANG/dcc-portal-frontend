import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AquafaangComponent } from './aquafaang.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AquafaangComponent', () => {
  let component: AquafaangComponent;
  let fixture: ComponentFixture<AquafaangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AquafaangComponent,
        HeaderComponent,
        RelatedItemsComponent,
        RobustLinkComponent
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AquafaangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
