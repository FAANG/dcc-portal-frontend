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
  options: {};

  constructor() { }

  ngOnInit(): void {
    // TO DO: set options and tracks data dynamically
    // use "reference" option for displaying ensembl genes
    // "reference" is not required when using default config with refseq genes
    this.options = {
        genome: "susScr11",
        reference: {
          "id": "susScr11",
          "fastaURL": "https://s3.amazonaws.com/igv.org.genomes/susScr11/susScr11.fa",
          "tracks": [
            // {
            //   "name": "Ensembl Genes",
            //   "url": "https://ftp.ensembl.org/pub/release-108/gff3/sus_scrofa/Sus_scrofa.Sscrofa11.1.108.gff3.gz",
            //   "order": 1000000,
            //   "indexed": false
            // },
            {
              "name": "RefSeq Genes",
              "url": "https://s3.amazonaws.com/igv.org.genomes/susScr11/refGene.sorted.txt.gz",
              "order": 1000000,
              "indexed": false
            }
          ]
        }
     };
    this.tracks = [
      {
        'longLabel': 'liver_fetus_control',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_control.mRp.clN.bigWig',
      },
      {
        'longLabel': 'liver_fetus_highfibre',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_highfibre.mRp.clN.bigWig',
      },
      {
        'longLabel': 'liver_fetus_lowfibre',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/liver_fetus_lowfibre.mRp.clN.bigWig',
      },
      {
        'longLabel': 'consensus_peak',
        'bigDataUrl': 'https://api.faang.org/files/trackhubs/GENE-SwitCH_WP5_ATAC-seq/Sscrofa11.1/gs-wp5/consensus_peaks.bb',
      }
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
