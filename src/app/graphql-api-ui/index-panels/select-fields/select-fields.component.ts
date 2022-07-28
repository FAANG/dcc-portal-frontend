import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { indexDetails } from '../../constants';
import { IndexPanelContainerService } from '../../index-panel-container/index-panel-container.service';
import { buildFormBuilderFromIndexDetails } from '../../utils';

@Component({
  selector: 'app-select-fields',
  templateUrl: './select-fields.component.html',
  styleUrls: ['./select-fields.component.css'],
  providers:[IndexPanelContainerService]
})
export class SelectFieldsComponent implements OnInit {

  @Input() indexName = '';
  @Input() indexPath =  [];
  @Input() indexPanelContainerService: any;
  
  fields = [];

  basicFiltersForm :Record<string,any>;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fields = indexDetails[this.indexName]['fields'];
    this.basicFiltersForm = this.fb.group(this.fields?.reduce((fieldsObject,field)=>({...fieldsObject,[field]:[true]}),{}) || {});
    // this.indexPanelContainerService.updateFieldsQueryData(this.indexName,{...this.basicFiltersForm.value},this.indexPath);
  }


  onFieldToggle(fieldName:string){
   
    this.basicFiltersForm.get(fieldName).setValue(!this.basicFiltersForm.get(fieldName).value)
    this.indexPanelContainerService.updateFieldsQueryData(this.indexName,{...this.basicFiltersForm.value},this.indexPath);

  }

}
