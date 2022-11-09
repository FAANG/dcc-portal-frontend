import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import * as igv from 'igv'

@Component({
  selector: 'app-local-genome-browser',
  templateUrl: './local-genome-browser.component.html',
  styleUrls: ['./local-genome-browser.component.css']
})
export class LocalGenomeBrowserComponent implements OnInit, AfterViewInit {
  @ViewChild('igvdiv') igvDiv: ElementRef;
  tracks;
   browser: any;
   options = {
      genome: "susScr11"
   };

  constructor() { }

  ngOnInit(): void {
    this.tracks = [
      {
        'longLabel': 'liver_fetus_control',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_control.mRp.clN.bigWig'
      },
      {
        'longLabel': 'liver_fetus_highfibre',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_highfibre.mRp.clN.bigWig'
      },
      {
        'longLabel': 'liver_fetus_lowfibre',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_lowfibre.mRp.clN.bigWig'
      },
    ];
  }

  ngAfterViewInit(): void {
    this.createBrowser();
  }

  async createBrowser() {
    try {
        this.browser = await igv.createBrowser(this.igvDiv.nativeElement, this.options);
    } catch(e) {
        console.log(e);
    }
  }
  addTrackByUrl(trackUrl) {
    this.browser.loadTrack({
        url: trackUrl,
    })
  }

  ngOnDestroy() {
    igv.removeAllBrowsers();
  }

}
