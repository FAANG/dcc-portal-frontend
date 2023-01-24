import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-index-filters',
  templateUrl: './index-filters.component.html',
  styleUrls: ['./index-filters.component.css']
})
export class IndexFiltersComponent implements OnInit {
  @Input() firstIndex;
  @Input() secondIndex;
  @Input() indexFilters;
  public filterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    const filters = this.filterForm.get('filterFields') as FormArray;
    filters.push(this.createFilterFormGroup());
  }

  public removeFilter(i: number) {
    const filters = this.filterForm.get('filterFields') as FormArray;
    if (filters.length > 1) {
      filters.removeAt(i);
    } else {
      filters.reset();
    }
  }

  private createFilterFormGroup(): FormGroup {
    return new FormGroup({
      filterName: new FormControl('', Validators.required),
      filterValue: new FormControl('', Validators.required)
    });
  }

}

