import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-index-filters',
  templateUrl: './index-filters.component.html',
  styleUrls: ['./index-filters.component.css'],
  standalone: true,
  imports: [MatToolbar, FormsModule, ReactiveFormsModule, FlexModule, MatFormField, MatLabel, MatSelect, MatOption, MatError, MatInput,
    MatIconButton, MatTooltip, MatIcon]
})
export class IndexFiltersComponent implements OnInit {
  @Input() firstIndex;
  @Input() secondIndex;
  @Input() indexFilters;
  public filterForm!: FormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      filterFields: this.formBuilder.array([this.createFilterFormGroup()])
    });

    console.log(this.filterForm);
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

  getControls() {
    if (this.filterForm) {
      const filterFields = this.filterForm.get('filterFields');
      if (filterFields) {
        return filterFields['controls'];
      }
      return [];
    }

  }

}

