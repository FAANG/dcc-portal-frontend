import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { FileList } from '../shared/file-list';
import { File } from '../shared/file';

import { ApiFileService }  from '../core/services/api-file.service';

let specimenFilesStyles: string = `
  .clickable {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    div.faang-filter {
      width: 300px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

@Component({
    selector: 'specimen-files',
    templateUrl: './specimen-files.component.html',
    styles: [ specimenFilesStyles ],
})

export class SpecimenFilesComponent{ 
  // public properties
  fileList: FileList;
  fileOffset: number

  // private properties
  private routeSubscription: Subscription = null;
  private fileSource: Subject<Observable<FileList>>;
  private fileSubscription: Subscription = null
  private query: {[term: string]: any} = {};
  private pageLimit: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiFileService: ApiFileService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.titleService.setTitle('FAANG specimens');
    this.fileSource = new Subject<Observable<FileList>>();
    this.fileSubscription = this.fileSource
        .switchMap((o: Observable<FileList>):Observable<FileList> => o)
        .subscribe((e: FileList) => {
          this.fileList = e;});

    this.fileOffset = 0;
    this.pageLimit = 20;
    this.getFileList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {name: string}) => {
        this.fileOffset = 0;
        this.query['from'] = this.fileOffset
        this.query['size'] = this.pageLimit
        this.query['sort'] = [{name: "desc"}]
        this.getFileList();
      });
  };

  getFileList() {
    this.fileSource.next(this.apiFileService.getAll(this.query));
  }

  ngOnDestroy() {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.fileSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.fileOffset += this.pageLimit;
      this.query['from'] = this.fileOffset
      this.getFileList();
    }
  }
  tablePrevious() {
    if (this.fileList && this.fileList.hits) {
      this.fileOffset = (this.fileOffset >= this.pageLimit) ? this.fileOffset - this.pageLimit : 0;
      this.query['from'] = this.fileOffset
      this.getFileList();
    }
  }
  tableHasMore():boolean {
    if (this.fileList && this.fileList.hits.total > this.fileOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
};
