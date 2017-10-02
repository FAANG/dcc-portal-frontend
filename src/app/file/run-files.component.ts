import { Component, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { FileList } from '../shared/file-list';
import { File } from '../shared/file';

import { ApiFileService }  from '../core/services/api-file.service';

let runFilesStyles: string = `
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
    selector: 'run-files',
    templateUrl: './run-files.component.html',
    styles: [ runFilesStyles ],
})

export class RunFilesComponent{ 
  @Input() runId: string;

  // public properties
  fileList: FileList;
  fileOffset: number = 0

  // private properties
  private fileSource: Subject<Observable<FileList>>;
  private fileSubscription: Subscription = null;
  private pageLimit: number = 10


  constructor(
    private apiFileService: ApiFileService,
  ){ };

  getFileList() {
    if (this.runId) { 
      this.fileSource.next(this.apiFileService.getSpecimensFilesByRun(this.runId, this.fileOffset));
    }else {
      this.fileSource.next(Observable.empty<FileList>());
    }
  }

  initFileSource() {
    this.fileSource = new Subject<Observable<FileList>>();
    this.fileSubscription = this.fileSource
        .switchMap((o: Observable<FileList>):Observable<FileList> => o)
        .subscribe((f:FileList) => this.fileList = f );
  };

  ngOnChanges(changes: SimpleChanges) {
    if (! this.fileSource) {
      this.initFileSource();
    }
    if (changes['runId']) {
      this.fileOffset = 0;
      this.getFileList();
    }
  }

  ngOnDestroy() {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.fileOffset += this.pageLimit;
      this.getFileList();
    }
  }
  tablePrevious() {
    if (this.fileList && this.fileList.hits) {
      this.fileOffset = (this.fileOffset >= this.pageLimit) ? this.fileOffset - this.pageLimit : 0;
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
