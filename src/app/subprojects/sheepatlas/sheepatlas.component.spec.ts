import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SheepatlasComponent } from './sheepatlas.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {RelatedItemsComponent} from '../../shared/related-items/related-items.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SheepatlasComponent', () => {
  let component: SheepatlasComponent;
  let fixture: ComponentFixture<SheepatlasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        SheepatlasComponent,
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
    fixture = TestBed.createComponent(SheepatlasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
