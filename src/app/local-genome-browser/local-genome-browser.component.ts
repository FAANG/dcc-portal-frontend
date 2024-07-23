import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodePadding, MatTreeNodeToggle } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import * as igv from 'igv';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { HeaderComponent } from '../shared/header/header.component';

interface DirNode {
  name: string;
  data: object;
  children?: DirNode[];
}
interface FileNode {
  expandable: boolean;
  data: object;
  name: string;
  level: number;
}

@Component({
  selector: 'app-local-genome-browser',
  templateUrl: './local-genome-browser.component.html',
  styleUrls: ['./local-genome-browser.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatTree, MatTreeNodeDef,
    MatTreeNode, MatTreeNodePadding, MatCheckbox, FormsModule, MatIconButton, MatTreeNodeToggle, MatIcon]
})
export class LocalGenomeBrowserComponent implements OnInit, OnDestroy {
  @ViewChild('igvdiv') igvDiv!: ElementRef;
  currentTracks: {[index: string]: any} = {};
  tracksList: any[] = [];
  browser: any;
  options: {[index: string]: any} = {};
  trackhubs: any[] = [];
  genome = '';
  defaultChr = '';
  genomeList: any;
  disableSelection = false;
  treeControl: any;
  treeFlattener: any;
  dataSource: any;

  private _transformer = (node: DirNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      data: node.data,
      level: level
    };
  }

  constructor(
    private dataService: ApiDataService,
    private http: HttpClient,
    private titleService: Title) { }

  hasChild = (_: number, node: FileNode) => node.expandable;

  ngOnInit(): void {
    this.treeControl = new FlatTreeControl<FileNode>(
      node => node.level,
      node => node.expandable,
    );

    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      node => node.level,
      node => node.expandable,
      node => node.children
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.titleService.setTitle('FAANG Genome Browser');
    this.currentTracks = {};
    this.fetchData();
  }

  configureBrowser() {
    this.options = {
      'genome': this.genome,
      'genomeList': 'https://api.faang.org/files/genomes/genomes.json'
    };
    this.createBrowser();
  }

  async createBrowser() {
    try {
        this.browser = await igv.createBrowser(this.igvDiv.nativeElement, this.options);
    } catch (e) {
        console.log(e);
    }
  }

  addTrackByUrl(trackName: any, trackUrl: string | number, trackType: any, genome: string) {
    // deselecting tracks
    if (this.tracksList.includes(trackUrl)) {
      this.currentTracks[trackUrl] = false;
      this.tracksList = this.tracksList.filter(item => item !== trackUrl);
      this.browser.removeTrackByName(trackName);
    } else {
      if (this.genome === genome) {
        this.currentTracks[trackUrl] = true;
        this.tracksList.push(trackUrl);
        this.browser.loadTrack({
            name: trackName,
            url: trackUrl,
            type: trackType
        });
        this.browser.search(this.defaultChr);
      } else {
        this.genome = genome;
        this.resetTracks();
        this.currentTracks[trackUrl] = true;
        this.tracksList.push(trackUrl);
        this.configureBrowser();
        this.getDefaultChr(genome);
        this.disableSelection = true;
        setTimeout(() => {
          this.disableSelection = false;
          this.browser.loadTrack({
            name: trackName,
            url: trackUrl,
            type: trackType
          });
          this.browser.search(this.defaultChr);
        }, 4000);
      }
    }
  }

  getDefaultChr(genome: string) {
    this.http.get('https://api.faang.org/files/genomes/genomes.json').subscribe((data: {[index: string]: any}) => {
      for (const index in data) {
        if (data[index ]['id'] === genome) {
          const headers = new HttpHeaders().set('Range', 'bytes=0-50');
          this.http.get(data[index]['indexURL'], {headers: headers, responseType: 'text'}).subscribe(txt => {
            this.defaultChr = txt.split('\n')[0].split('\t')[0];
          });
        }
      }
    });
  }

  resetTracks() {
    for (const key of Object.keys(this.currentTracks)) {
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

  generateTrackhubsListing() {
    const trackhubsTreeData: any[] = [];
    this.trackhubs.forEach(trackhub => {
      const nodeData: {[index: string]: any} = {};
      nodeData['name'] = trackhub['name'];
      if (trackhub.hasOwnProperty('subdirectories')) {
        nodeData['children'] = [];
        trackhub['subdirectories'].forEach((subDir: { [x: string]: any[]; }) => {
          const subDirData: {[index: string]: any} = {};
          subDirData['name'] = subDir['name'];
          subDirData['children'] = subDir['tracks'].map(track => {
            this.currentTracks[track['bigDataUrl']] = false;
            return {
              'name': track['track'],
              'data': {
                'description': track['longLabel'],
                'url': track['bigDataUrl'],
                'format': track['type'],
                'genome': trackhub['genome']['gcaAccession']
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
