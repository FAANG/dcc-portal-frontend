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
  currentTracks: {};
  tracksList = [];
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
    this.currentTracks = {};
    this.fetchData();
  }

  configureBrowser() {
    this.options = {
      "reference": {
        "id": this.genome
      }
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

  addTrackByUrl(trackName, trackUrl, trackType, genome) {
    // deselecting tracks
    if (this.tracksList.includes(trackUrl)) {
      this.currentTracks[trackUrl] = false;
      this.tracksList = this.tracksList.filter(item => item !== trackUrl);
      this.browser.removeTrackByName(trackName);
      console.log(this.browser);
    } 
    // selecting tracks
    else {
      if (this.genome == genome) {
        this.currentTracks[trackUrl] = true;
        this.tracksList.push(trackUrl);
        this.browser.loadTrack({
            name: trackName,
            url: trackUrl,
            type: trackType
        });
      }
      else {
        this.genome = genome;
        this.resetTracks();
        this.currentTracks[trackUrl] = true;
        this.tracksList.push(trackUrl);
        this.configureBrowser();
        this.disableSelection = true;
        setTimeout(() => {
          this.disableSelection = false;
          this.browser.loadTrack({
            name: trackName,
            url: trackUrl,
            type: trackType
          })
        }, 4000);
      }
    }
  }

  resetTracks() {
    for (var key of Object.keys(this.currentTracks)) {
      this.currentTracks[key] = false;
    }
    this.tracksList = [];
    igv.removeAllBrowsers();
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
            this.currentTracks[track['bigDataUrl']] = false;
            return {
              'name': track['track'],
              'data': {
                'description': track['longLabel'],
                'url': track['bigDataUrl'],
                'format': track['type'],
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
