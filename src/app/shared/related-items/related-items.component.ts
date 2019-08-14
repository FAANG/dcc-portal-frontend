import {Component, Input, OnInit} from '@angular/core';
import {ApiFileService} from '../../services/api-file.service';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @Input() record_id: string;
  @Input() source_type: string;
  @Input() target_type: string;
  records: any;
  p = 1; // page number for html template
  // field names and values must match  i.e. same length and order
  // field names are the table headers
  // field values are the actual value in the table
  // field values having links have value of 'prefix', 'url', 'display'
  field_names = new Map<string, string[]>();
  field_values = new Map<string, string[]>();
  field_values_having_links = new Map<string, string[]>();

  constructor(private apiFileService: ApiFileService) {
    this.field_names.set('specimen-specimen', ['specimen-relationship']);
    this.field_names.set('specimen-file', ['files for specimen']);
    this.field_names.set('specimen-analysis', ['analyses for specimen']);
    this.field_names.set('analysis-file', ['Name', 'Type', 'Size', 'Checksum']);
    this.field_values.set('analysis-file', ['name', 'type', 'size', 'checksum']);
    this.field_values_having_links.set('analysis-file-name', ['ftp://', 'url', 'name']);
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

}
