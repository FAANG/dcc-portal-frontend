import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @Input() record_id: string; // the record id used to retrieve particular record
  @Input() source_type: string; // equal to the type of detail page, e.g. to list files in the dataset detail page, set to be dataset
  @Input() target_type: string; // the related entities, e.g. to list files in the dataset detail page, set to be file
  @Input() download_key: string; // if download not needed (nomrally not file), set to empty string, otherwise to the link attribute

  records: any;
  urls: string[] = [];
  checked = false;

  p = 1; // page number for html template
  // field names and values must match  i.e. same length and order
  // field names are the table headers
  // field values are the actual value in the table
  // field values having links have value of 'prefix', 'url', 'display'
  // and keys as source_type-target_entity-display
  field_names = new Map<string, string[]>();
  field_values = new Map<string, string[]>();
  field_values_having_links = new Map<string, string[]>();
  // to use this component, 4 steps:
  // Step 1: add corresponding setting in the constructor
  // Step 2: in ngOnInit, add else if to retrieve the data
  // Step 3: add in the detail page
  // Step 4: make necessary adjustment (i.e. debugging)

  constructor(private apiFileService: ApiFileService) {
    // better to have the following setting in a separate file
    // files in the analysis detail page
    this.field_names.set('analysis-file', ['Name', 'Type', 'Size', 'Checksum']);
    this.field_values.set('analysis-file', ['name', 'type', 'size', 'checksum']);
    this.field_values_having_links.set('analysis-file-name', ['ftp://', 'url']);
    // papers in the dataset detail page
    this.field_names.set('dataset-paper', ['Title', 'Year', 'Journal']);
    this.field_values.set('dataset-paper', ['title', 'year', 'journal']);
    this.field_values_having_links.set('dataset-paper-title', ['https://doi.org/', 'doi']);
    // sepcimens in the dataset detail page
    this.field_names.set('dataset-specimen', ['BioSamples ID', 'Material', 'Cell type', 'Sex', 'Species', 'Breed']);
    this.field_values.set('dataset-specimen', ['biosampleId', 'material.text', 'cellType.text', 'sex.text', 'organism.text', 'breed.text']);
    this.field_values_having_links.set('dataset-specimen-biosampleId', ['../specimen/', 'biosampleId']);
    // files in the dataset detail page
    this.field_names.set('dataset-file', ['File name', 'Experiment', 'Archive', 'File size']);
    this.field_values.set('dataset-file', ['name', 'experiment', 'archive', 'readableSize']);
    this.field_values_having_links.set('dataset-file-name', ['../file/', 'fileId']);
    // papers in the organism detail page
    this.field_names.set('organism-paper', ['Title', 'Year', 'Journal']);
    this.field_values.set('organism-paper', ['title', 'year', 'journal']);
    this.field_values_having_links.set('organism-paper-title', ['https://doi.org/', 'doi']);
    // specimens in the organism detail page
    this.field_names.set('organism-specimen', ['BioSample ID', 'Organism part/Cell type', 'Material type']);
    this.field_values.set('organism-specimen', ['_source.biosampleId', '_source.cellType.text', '_source.material.text']);
    this.field_values_having_links.set('organism-specimen-_source.biosampleId', ['../specimen/', '_source.biosampleId']);

    // papers in the specimen detail page
    this.field_names.set('specimen-paper', ['Title', 'Year', 'Journal']);
    this.field_values.set('specimen-paper', ['title', 'year', 'journal']);
    this.field_values_having_links.set('specimen-paper-title', ['https://doi.org/', 'doi']);
    // sepcimens in the specimen detail page
    this.field_names.set('specimen-specimen', ['BioSamples ID', 'Organism part/Cell type', 'Material type']);
    this.field_values.set('specimen-specimen',
      ['_source.biosampleId', '_source.cellType.text', '_source.material.text']);
    this.field_values_having_links.set('specimen-specimen-_source.biosampleId', ['../specimen/', '_source.biosampleId']);
    // files in the specimen detail page
    this.field_names.set('specimen-file', ['Name', 'Archive', 'Experiment', 'Run', 'Assay type', 'Experiment target']);
    this.field_values.set('specimen-file', ['_id', '_source.archive', '_source.experiment.accession', '_source.run.accession',
      '_source.experiment.assayType', '_source.experiment.target']);
    this.field_values_having_links.set('specimen-file-_id', ['../file/', '_id']);
    this.field_values_having_links.set('specimen-file-_source.experiment.accession',
      ['http://www.ebi.ac.uk/ena/data/view/', '_source.experiment.accession']);
    this.field_values_having_links.set('specimen-file-_source.run.accession',
      ['http://www.ebi.ac.uk/ena/data/view/', '_source.run.accession']);
  }

  ngOnInit() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    if (relationship_type === 'analysis-file') {
      this.apiFileService.getAnalysis(this.record_id).subscribe(
        (data: any) => {
          this.records = data['_source']['files'];
        });
    } else if (relationship_type === 'dataset-specimen') {
      this.apiFileService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['specimen'];
        });
    } else if (relationship_type === 'dataset-file') {
      this.apiFileService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['file'];
        });
    } else if (relationship_type === 'dataset-paper') {
      this.apiFileService.getDataset(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'organism-paper') {
      this.apiFileService.getOrganism(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'organism-specimen') {
      this.apiFileService.getOrganismsSpecimens(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'specimen-paper') {
      this.apiFileService.getSpecimen(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'][0]['_source']['publishedArticles'];
        });
    } else if (relationship_type === 'specimen-specimen') {
      this.apiFileService.getSpecimenRelationships(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    } else if (relationship_type === 'specimen-file') {
      this.apiFileService.getSpecimenFiles(this.record_id).subscribe(
        (data: any) => {
          this.records = data['hits']['hits'];
        });
    }


  }

  // get table headers
  get_field_names() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    return this.field_names.get(relationship_type);
  }

  // get the attribute names to populate the table
  get_field_values() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    return this.field_values.get(relationship_type);
  }

  // the attributes to render the link
  get_field_values_for_links(attr: string) {
    const key_value = `${this.source_type}-${this.target_type}-${attr}`;
    return this.field_values_having_links.get(key_value);
  }

  // only show the download button when the target is files
  showButton() {
    return this.target_type === 'file';
  }

  downloadAllFiles() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  disableButton() {
    return this.urls.length === 0;
  }

  // get the number of files selected
  getUrlsLength() {
    return this.urls.length;
  }

  getValue(record: any, attr: string) {
    const elmts = attr.split('.');
    let curr: any = record;
    for (const elmt of elmts) {
      curr = curr[elmt];
    }
    return curr;
  }

  // the behaviour of the checkbox in the table under Download column
  onCheckboxClick(url: string) {
    url = 'ftp://' + url;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
  }

  // the checked status of the checkbox in the table under Download column
  CheckboxChecked(url: string) {
    url = 'ftp://' + url;
    return this.urls.indexOf(url) !== -1;
  }

  // determine the checked status of the checkbox in the table header, which is mat-checkbox ready
  // return 2 means all files selected (mat-checkbox checked), 1 means partially files selected (mat-checkbox indeterminate)
  // and 0 means none selected
  mainCheckboxChecked() {
    if (this.records) {
      if (this.urls.length === this.records.length) {
        this.checked = true;
        return 2;
      } else {
        this.checked = false;
        if (this.urls.length > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  // the behaviour of the checkbox in the table header
  mainCheckboxClicked() {
    if (this.checked === true) {
      this.urls = [];
    } else {
      const url_location = this.download_key.split('.');
      for (const record of this.records) {
        let curr: any = record;
        for (const index of url_location) {
          curr = curr[index];
        }
        const url = 'ftp://' + curr;
        const idx = this.urls.indexOf(url);
        if (idx === -1) {
          this.urls.push(url);
        }
      }
    }
    this.checked = !this.checked;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
