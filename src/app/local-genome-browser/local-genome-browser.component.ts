import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import * as igv from 'igv'

interface dirNode {
  name: string;
  data: object;
  children?: dirNode[];
}
interface fileNode {
  expandable: boolean;
  data: object;
  name: string;
  level: number;
}

@Component({
  selector: 'app-local-genome-browser',
  templateUrl: './local-genome-browser.component.html',
  styleUrls: ['./local-genome-browser.component.css']
})
export class LocalGenomeBrowserComponent implements OnInit, OnDestroy {
  @ViewChild('igvdiv') igvDiv: ElementRef;
  tracks;
  browser: any;
  options: {};
  trackhubs;
  genome = '';
  disableSelection = false;
  private _transformer = (node: dirNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      data: node.data,
      level: level
    };
  };

  treeControl = new FlatTreeControl<fileNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private dataService: ApiDataService) { }

  hasChild = (_: number, node: fileNode) => node.expandable;

  ngOnInit(): void {
    this.fetchData();
  }

  configureBrowser() {
    this.options = {
      "genome": this.genome
    };
    this.createBrowser();
  }

  async createBrowser() {
    try {
        this.browser = await igv.createBrowser(this.igvDiv.nativeElement, this.options);
    } catch(e) {
        console.log(e);
    }
  }

  addTrackByUrl(trackUrl, genome) {
    if (this.genome == genome) {
      this.browser.loadTrack({
          url: trackUrl,
      });
    }
    else {
      this.genome = genome;
      igv.removeAllBrowsers();
      this.configureBrowser();
      this.disableSelection = true;
      setTimeout(() => {
        this.disableSelection = false;
        this.browser.loadTrack({
          url: trackUrl,
        })
      }, 2500);
    }
  }

  fetchData() {
    this.dataService.getTrackhubsData().subscribe(
      (res: any) => {
        this.trackhubs = res['data'];
        this.generateTrackhubsListing();
      }
    );
  }

  getTracksForTree(tracksList) {
    let trackResList = [];
    tracksList.forEach(track => {
      let trackRes = {
        'name': track['track'],
        'url': track['bigDataUrl'],
        'type': track['type']
      }
      trackResList.push(trackRes);
    });
    return trackResList;
  }

  generateTrackhubsListing() {
    let trackhubsTreeData = [];
    this.trackhubs.forEach(trackhub => {
      let nodeData = {};
      nodeData['name'] = trackhub['name'];
      if (trackhub.hasOwnProperty('subdirectories')) {
        nodeData['children'] = [];
        trackhub['subdirectories'].forEach(subDir => {
          let subDirData = {};
          subDirData['name'] = subDir['name'];
          subDirData['children'] = subDir['tracks'].map(track => {
            return {
              'name': track['track'],
              'data': {
                'description': track['longLabel'],
                'url': track['bigDataUrl'],
                'genome': trackhub['genome']['ucscAssemblyVersion']
              }
            };
          });
          nodeData['children'].push(subDirData);
        });
      }
      trackhubsTreeData.push(nodeData);
    });
    this.dataSource.data = trackhubsTreeData;
  }

  ngOnDestroy() {
    igv.removeAllBrowsers();
  }

}
