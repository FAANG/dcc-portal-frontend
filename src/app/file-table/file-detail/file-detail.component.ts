import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  fileId: string;
  file: any;
  experiment: any = {};
  error: any;
  fieldNames = {
    assayType: 'Assay type',
    sampleStorage: 'Sample storage',
    sampleStorageProcessing: 'Sample storage processing',
    samplingToPreparationInterval: 'Sampling to preparation interval',
    experimentalProtocol: 'Experimental protocol',
    extractionProtocol: 'Extraction protocol',
    libraryPreparationLocation: 'Library preparation location',
    libraryPreparationLocationLongitude: 'Library preparation location longitude',
    libraryPreparationLocationLatitude: 'Library preparation location latitude',
    libraryPreparationDate: 'Library preparation date',
    sequencingLocation: 'Sequencing location',
    sequencingLocationLatitude: 'Sequencing location latitude',
    sequencingLocationLongitude: 'Sequencing location longitude',
    sequencingDate: 'Sequencing date',
    experimentTarget: 'Experiment target',
    rnaPreparation3AdapterLigationProtocol: 'Rna preparation 3\' adapter ligation protocol',
    rnaPreparation5AdapterLigationProtocol: 'Rna preparation 5\' adapter ligation protocol',
    libraryGenerationPcrProductIsolationProtocol: 'Library generation PCR product isolation protocol',
    preparationReverseTranscriptionProtocol: 'Preparation reverse transcription protocol',
    libraryGenerationProtocol: 'Library generation protocol',
    readStrand: 'Read strand',
    rnaPurity260230ratio: 'Rna purity - 260:230 ratio',
    rnaPurity260280ratio: 'Rna purity - 260:280 ratio',
    rnaIntegrityNumber: 'Rna integrity number',
    librarySelection: 'Library selection',
    bisulfiteConversionProtocol: 'Bisulfite conversion protocol',
    pcrProductIsolationProtocol: 'PCR product isolation protocol',
    bisulfiteConversionPercent: 'Bisulfite conversion percent',
    restrictionEnzyme: 'Restriction enzyme',
    maxFragmentSizeSelectionRange: 'Max fragment size selection range',
    minFragmentSizeSelectionRange: 'Min fragment size selection range',
    transposaseProtocol: 'Transposase protocol',
    dnaseProtocol: 'DNase protocol',
    restrictionSite: 'Restriction site',
    chipProtocol: 'ChIP protocol',
    chipAntibodyProvider: 'ChIP antibody provider',
    chipAntibodyCatalog: 'ChIP antibody catalog',
    chipAntibodyLot: 'ChIP antibody lot',
    libraryGenerationMaxFragmentSizeRange: 'Library generation max fragment size range',
    libraryGenerationMinFragmentSizeRange: 'Library generation min fragment size range'
  };

  fieldExcludeNames = {
    accession: 'accession',
    standardMet: 'standard Met',
    versionLastStandardMet: 'version last standard met',
  };

  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG file`);
    });
    this.apiFileService.getFile(this.fileId).subscribe(
      (data: any) => {
        this.file = data['hits']['hits'][0]['_source'];
        if (this.file) {
          this.spinner.hide();
          if (this.file.hasOwnProperty('experiment')) {
            this.apiFileService.getFilesExperiment(this.file['experiment']['accession']).subscribe(
              (data: any) => {
                this.expandObject(data['hits']['hits'][0]['_source']);
                console.log(data['hits']['hits'][0]['_source']);
              },
              error => {
                this.error = error;
              }
            );
          }
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
  }

  expandObject(myObject: any) {
    for (const key in myObject) {
      if (key in this.fieldNames) {
        if (typeof myObject[key] === 'object') {
          for (const secondaryKey in myObject[key]) {
            if (myObject[key][secondaryKey] !== '') {
              this.experiment[key] = myObject[key];
            }
          }
        } else {
          if (myObject[key] !== '') {
            this.experiment[key] = myObject[key];
          }
        }
      } else {
        if (key in this.fieldExcludeNames) {
          continue;
        } else {
          this.expandObject(myObject[key]);
        }
      }
    }
  }

  checkIsObject(value: any) {
    if (typeof value === 'object') {
      return true;
    } else {
      return false;
    }
  }
}
