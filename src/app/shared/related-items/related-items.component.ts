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
  checked = true;

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
          const url_location = this.download_key.split('.');
          if (this.download_key.length > 0) {
            for (const record of this.records) {
              let curr: any = record;
              for (const index of url_location) {
                curr = curr[index];
              }
              this.urls.push('ftp://' + curr);
            }
          }
        });
    }


  }

  get_field_names() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    return this.field_names.get(relationship_type);
  }

  get_field_values() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    return this.field_values.get(relationship_type);
  }

  get_field_values_for_links(attr: string) {
    const key_value = `${this.source_type}-${this.target_type}-${attr}`;
    return this.field_values_having_links.get(key_value);
  }

  showButton() {
    return this.target_type === 'file';
  }

  downloadAllFiles() {
    this.urls.forEach(url => FileSaver.saveAs(url));
  }

  onCheckboxClick(url: string) {
    url = 'ftp://' + url;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
    console.log(this.urls.length);
  }

  disableButton() {
    return this.urls.length === 0;
  }

  getUrlsLength() {
    return this.urls.length;
  }

  CheckboxChecked(url: string) {
    url = 'ftp://' + url;
    return this.urls.indexOf(url) !== -1;
  }

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
