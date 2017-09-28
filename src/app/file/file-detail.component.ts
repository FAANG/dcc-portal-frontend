import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { File } from '../shared/file';

import { ApiFileService }  from '../core/services/api-file.service';

@Component({
    selector: 'file-detail',
    templateUrl: './file-detail.component.html',
})
export class FileDetailComponent implements OnInit, OnDestroy { 
  // public properties
  fileId: string
  file: File

  // private properties
  private routeSubscription: Subscription = null;
  private fileSource: Subject<Observable<File>>;
  private fileSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiFileService: ApiFileService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.fileSource = new Subject<Observable<File>>();
    this.fileSubscription = this.fileSource
        .switchMap((o: Observable<File>):Observable<File> => o)
        .subscribe((e: File) => this.file = e );
    this.routeSubscription =
      this.activatedRoute.params.subscribe((params: {biosampleId: string}) => {
        this.fileId = params.biosampleId.toUpperCase();
        this.titleService.setTitle(`${this.fileId} | FAANG organism`);
        if (this.fileId){
          this.fileSource.next(this.apiFileService.get(this.fileId));
        }
      });
  };

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
  };
};
