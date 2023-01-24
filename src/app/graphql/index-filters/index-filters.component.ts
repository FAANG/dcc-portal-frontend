import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormArray, UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder} from '@angular/forms';


@Component({
  selector: 'app-index-filters',
  templateUrl: './index-filters.component.html',
  styleUrls: ['./index-filters.component.css']
})
export class IndexFiltersComponent implements OnInit {
  @Input() firstIndex;
  @Input() secondIndex;
  @Input() indexFilters;
  public filterForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterFields: this.formBuilder.array([this.createFilterFormGroup()])
    });
  }

  getFormValues() {
    if (this.filterForm.valid ) {
      return this.filterForm.value;
    }
    return null;
  }

  public addFilterFormGroup() {
    const filters = this.filterForm.get('filterFields') as UntypedFormArray;
    filters.push(this.createFilterFormGroup());
  }

  public removeFilter(i: number) {
    const filters = this.filterForm.get('filterFields') as UntypedFormArray;
    if (filters.length > 1) {
      filters.removeAt(i);
    } else {
      filters.reset();
    }
  }

  private createFilterFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      filterName: new UntypedFormControl('', Validators.required),
      filterValue: new UntypedFormControl('', Validators.required)
    });
  }

}

