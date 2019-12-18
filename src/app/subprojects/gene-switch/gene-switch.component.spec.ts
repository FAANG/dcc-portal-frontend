import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSwitchComponent } from './gene-switch.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GeneSwitchComponent', () => {
  let component: GeneSwitchComponent;
  let fixture: ComponentFixture<GeneSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GeneSwitchComponent,
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
    fixture = TestBed.createComponent(GeneSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
