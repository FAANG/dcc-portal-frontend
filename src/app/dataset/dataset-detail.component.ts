import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Dataset } from '../shared/dataset';

import { ApiDatasetService } from '../core/services/api-dataset.service';

@Component({
    selector: 'dataset-detail',
    templateUrl: './dataset-detail.component.html',
})
export class DatasetDetailComponent implements OnInit, OnDestroy {
  // public properties
  accession: string;
  dataset: Dataset;
  pageLimit: number = 10;
  fileOffset: number = 0;
  specimenOffset: number = 0;
  currentDisplayedFiles: any[];

  // private properties
  private routeSubscription: Subscription = null;
  private datasetSource: Subject<Observable<Dataset>>;
  private datasetSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDatasetService: ApiDatasetService,
    private titleService: Title,
  ) { };

  ngOnInit() {
    this.datasetSource = new Subject<Observable<Dataset>>();
    this.datasetSubscription = this.datasetSource
        .switchMap((o: Observable<Dataset>): Observable<Dataset> => o)
        .subscribe((e: Dataset) => {this.dataset = e; } );
    this.routeSubscription =
      this.activatedRoute.params.subscribe((params: {accession: string}) => {
        this.accession = params.accession;
        this.titleService.setTitle(`${this.accession} | FAANG dataset`);
        if (this.accession) {
          this.datasetSource.next(this.apiDatasetService.get(this.accession));
        }
      });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.datasetSubscription) {
      this.datasetSubscription.unsubscribe();
    }
  };
};
