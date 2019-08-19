import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @Input() record_id: string;
  @Input() source_type: string;
  @Input() target_type: string;
  @Input() download_key: string;

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


  constructor(private apiFileService: ApiFileService) {
    // files in the analysis detail page
    this.field_names.set('analysis-file', ['Name', 'Type', 'Size', 'Checksum']);
    this.field_values.set('analysis-file', ['name', 'type', 'size', 'checksum']);
    this.field_values_having_links.set('analysis-file-name', ['ftp://', 'url']);
  }

  ngOnInit() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    if (relationship_type === 'analysis-file') {
      this.apiFileService.getAnalysis(this.record_id).subscribe(
        (data: any) => {
          this.records = data['_source']['files'];
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
}
